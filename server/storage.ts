// In-memory storage for development
// This should be replaced with a proper database in production

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  password: string; // hashed
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  status: string;
  createdAt: Date;
}

class MemStorage {
  private users: Map<string, User> = new Map();
  private orders: Map<string, Order> = new Map();
  private userIdCounter = 1;
  private orderIdCounter = 1;

  // User methods
  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const id = (this.userIdCounter++).toString();
    const user: User = {
      id,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = Array.from(this.users.values());
    for (const user of users) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return user;
      }
    }
    return null;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;
    
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Order methods
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const id = (this.orderIdCounter++).toString();
    const order: Order = {
      id,
      ...orderData,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const userOrders: Order[] = [];
    const orders = Array.from(this.orders.values());
    for (const order of orders) {
      if (order.userId === userId) {
        userOrders.push(order);
      }
    }
    return userOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orders.get(id) || null;
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orders.delete(id);
  }

  // Debug methods
  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  getAllOrders(): Order[] {
    return Array.from(this.orders.values());
  }

  clearAll(): void {
    this.users.clear();
    this.orders.clear();
    this.userIdCounter = 1;
    this.orderIdCounter = 1;
  }
}

// Singleton instance
export const storage = new MemStorage();
