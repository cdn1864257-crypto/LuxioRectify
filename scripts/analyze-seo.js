#!/usr/bin/env node

/**
 * SEO Analysis Script
 * 
 * This script analyzes the built application for SEO completeness.
 * It checks for:
 * - Presence of title and meta description
 * - OpenGraph and Twitter Card tags
 * - robots.txt and sitemap.xml files
 * - Images without alt text
 * - Other SEO best practices
 * 
 * Usage: node scripts/analyze-seo.js
 * Or add to package.json: "postbuild": "node scripts/analyze-seo.js"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function checkFileExists(filePath, description) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    log(`✓ ${description} exists`, 'green');
    return true;
  } else {
    log(`✗ ${description} is missing`, 'red');
    return false;
  }
}

function analyzeHTML(htmlPath) {
  if (!fs.existsSync(htmlPath)) {
    log(`⚠ HTML file not found: ${htmlPath}`, 'yellow');
    return { issues: [], warnings: [] };
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');
  const issues = [];
  const warnings = [];

  // Check for title tag
  if (!/<title>.*<\/title>/i.test(html)) {
    issues.push('Missing <title> tag');
  } else {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    if (titleMatch && titleMatch[1].length < 10) {
      warnings.push('Title tag is very short (< 10 characters)');
    }
    if (titleMatch && titleMatch[1].length > 70) {
      warnings.push('Title tag is very long (> 70 characters)');
    }
  }

  // Check for meta description
  if (!/<meta\s+name=["']description["']/i.test(html)) {
    issues.push('Missing <meta name="description"> tag');
  } else {
    const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    if (descMatch && descMatch[1].length < 50) {
      warnings.push('Meta description is very short (< 50 characters)');
    }
    if (descMatch && descMatch[1].length > 160) {
      warnings.push('Meta description is very long (> 160 characters)');
    }
  }

  // Check for canonical link
  if (!/<link\s+rel=["']canonical["']/i.test(html)) {
    warnings.push('Missing canonical link');
  }

  // Check for OpenGraph tags
  const ogTags = [
    'og:title',
    'og:description',
    'og:image',
    'og:url',
    'og:type',
  ];
  
  ogTags.forEach(tag => {
    const regex = new RegExp(`<meta\\s+property=["']${tag}["']`, 'i');
    if (!regex.test(html)) {
      warnings.push(`Missing OpenGraph tag: ${tag}`);
    }
  });

  // Check for Twitter Card tags
  if (!/<meta\s+name=["']twitter:card["']/i.test(html)) {
    warnings.push('Missing Twitter Card meta tag');
  }

  // Check for lang attribute
  if (!/<html[^>]+lang=/i.test(html)) {
    issues.push('Missing lang attribute on <html> tag');
  }

  // Check for viewport meta tag
  if (!/<meta\s+name=["']viewport["']/i.test(html)) {
    issues.push('Missing viewport meta tag');
  }

  // Check for images without alt text
  const imgTags = html.match(/<img[^>]*>/gi) || [];
  let imagesWithoutAlt = 0;
  
  imgTags.forEach(tag => {
    if (!/alt=["'][^"']*["']/i.test(tag) || /alt=["']["']/i.test(tag)) {
      imagesWithoutAlt++;
    }
  });

  if (imagesWithoutAlt > 0) {
    warnings.push(`${imagesWithoutAlt} image(s) without alt text found in HTML`);
  }

  return { issues, warnings };
}

function analyzeSitemap(sitemapPath) {
  if (!fs.existsSync(sitemapPath)) {
    return { issues: ['Sitemap file not found'], warnings: [] };
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const issues = [];
  const warnings = [];

  // Check if sitemap is valid XML
  if (!sitemap.includes('<?xml') || !sitemap.includes('<urlset')) {
    issues.push('Sitemap appears to be invalid XML');
  }

  // Check for URLs in sitemap
  const urlMatches = sitemap.match(/<loc>.*?<\/loc>/g) || [];
  if (urlMatches.length === 0) {
    issues.push('No URLs found in sitemap');
  } else {
    log(`  Found ${urlMatches.length} URLs in sitemap`, 'cyan');
  }

  // Check for old domain in sitemap
  if (sitemap.includes('luxios.vercel.app')) {
    issues.push('Old domain (luxios.vercel.app) found in sitemap - should be luxiomarket.shop');
  }

  // Check for lastmod dates
  const lastmodMatches = sitemap.match(/<lastmod>.*?<\/lastmod>/g) || [];
  if (lastmodMatches.length === 0 && urlMatches.length > 0) {
    warnings.push('No lastmod dates found in sitemap');
  }

  return { issues, warnings };
}

function analyzeRobotsTxt(robotsPath) {
  if (!fs.existsSync(robotsPath)) {
    return { issues: ['robots.txt file not found'], warnings: [] };
  }

  const robots = fs.readFileSync(robotsPath, 'utf-8');
  const issues = [];
  const warnings = [];

  // Check for Sitemap directive
  if (!/Sitemap:/i.test(robots)) {
    warnings.push('No Sitemap directive found in robots.txt');
  }

  // Check for old domain
  if (robots.includes('luxios.vercel.app')) {
    issues.push('Old domain (luxios.vercel.app) found in robots.txt - should be luxiomarket.shop');
  }

  // Check if too restrictive
  if (/Disallow:\s*\/\s*$/m.test(robots)) {
    warnings.push('robots.txt may be blocking all pages (Disallow: /)');
  }

  return { issues, warnings };
}

function main() {
  log('\n========================================', 'bright');
  log('  SEO Analysis Report', 'bright');
  log('========================================\n', 'bright');

  let totalIssues = 0;
  let totalWarnings = 0;

  // Check frontend build directory
  const frontendPublicDir = path.join(__dirname, '..', 'frontend', 'public');
  const frontendDistDir = path.join(__dirname, '..', 'frontend', 'dist');
  
  log('📋 Checking Essential SEO Files', 'blue');
  log('─────────────────────────────────\n', 'blue');

  // Check robots.txt
  const robotsPath = path.join(frontendPublicDir, 'robots.txt');
  const robotsCheck = checkFileExists(robotsPath, 'robots.txt');
  if (robotsCheck) {
    const robotsAnalysis = analyzeRobotsTxt(robotsPath);
    totalIssues += robotsAnalysis.issues.length;
    totalWarnings += robotsAnalysis.warnings.length;
    
    if (robotsAnalysis.issues.length > 0) {
      robotsAnalysis.issues.forEach(issue => log(`  ✗ ${issue}`, 'red'));
    }
    if (robotsAnalysis.warnings.length > 0) {
      robotsAnalysis.warnings.forEach(warning => log(`  ⚠ ${warning}`, 'yellow'));
    }
  } else {
    totalIssues++;
  }

  // Check sitemap.xml
  const sitemapPath = path.join(frontendPublicDir, 'sitemap.xml');
  const sitemapCheck = checkFileExists(sitemapPath, 'sitemap.xml');
  if (sitemapCheck) {
    const sitemapAnalysis = analyzeSitemap(sitemapPath);
    totalIssues += sitemapAnalysis.issues.length;
    totalWarnings += sitemapAnalysis.warnings.length;
    
    if (sitemapAnalysis.issues.length > 0) {
      sitemapAnalysis.issues.forEach(issue => log(`  ✗ ${issue}`, 'red'));
    }
    if (sitemapAnalysis.warnings.length > 0) {
      sitemapAnalysis.warnings.forEach(warning => log(`  ⚠ ${warning}`, 'yellow'));
    }
  } else {
    totalIssues++;
  }

  // Check index.html
  log('\n📄 Analyzing HTML SEO Tags', 'blue');
  log('───────────────────────────\n', 'blue');

  const htmlPath = path.join(__dirname, '..', 'frontend', 'index.html');
  const htmlAnalysis = analyzeHTML(htmlPath);
  totalIssues += htmlAnalysis.issues.length;
  totalWarnings += htmlAnalysis.warnings.length;

  if (htmlAnalysis.issues.length > 0) {
    htmlAnalysis.issues.forEach(issue => log(`✗ ${issue}`, 'red'));
  } else {
    log('✓ All essential HTML tags present', 'green');
  }

  if (htmlAnalysis.warnings.length > 0) {
    htmlAnalysis.warnings.forEach(warning => log(`⚠ ${warning}`, 'yellow'));
  }

  // Check for favicon
  log('\n🖼️  Checking Visual Assets', 'blue');
  log('─────────────────────────────\n', 'blue');

  const faviconCheck = checkFileExists(
    path.join(frontendPublicDir, 'favicon.ico'),
    'favicon.ico'
  );
  if (!faviconCheck) totalWarnings++;

  // Summary
  log('\n========================================', 'bright');
  log('  Summary', 'bright');
  log('========================================\n', 'bright');

  if (totalIssues === 0 && totalWarnings === 0) {
    log('🎉 Perfect! No SEO issues or warnings found.', 'green');
    log('Your site is well-optimized for search engines.\n', 'green');
  } else {
    if (totalIssues > 0) {
      log(`❌ Found ${totalIssues} critical issue(s) that should be fixed`, 'red');
    }
    if (totalWarnings > 0) {
      log(`⚠️  Found ${totalWarnings} warning(s) that could be improved`, 'yellow');
    }
    log('');
  }

  // Return exit code based on critical issues
  if (totalIssues > 0) {
    log('💡 Tip: Fix critical issues before deploying to production\n', 'cyan');
    process.exit(1);
  } else {
    log('✅ All critical SEO requirements met!\n', 'green');
    process.exit(0);
  }
}

// Run the analysis
main();
