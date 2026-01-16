// components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            ReWear
          </a>
          <p className="footer-description">
            Sustainable fashion through clothing swaps. Join our community and
            give your clothes a new life.
          </p>
          <div className="socials">
            <a href="#" aria-label="Facebook">
              f
            </a>
            <a href="#" aria-label="Twitter">
              t
            </a>
            <a href="#" aria-label="Instagram">
              ig
            </a>
            <a href="#" aria-label="Email">
              @
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-nav">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/browse">Browse Items</a>
            </li>
            <li>
              <a href="/add">Add Item</a>
            </li>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <ul className="footer-nav">
            <li>
              <a href="/help">Help Center</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/guidelines">Community Guidelines</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Legal</h3>
          <ul className="footer-nav">
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
            <li>
              <a href="/cookies">Cookie Policy</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Questions? Contact us at contact@rewear.com</p>
        <p>+1 (800) 123-4567</p>
      </div>

      <div className="copyright">
        <p>© {new Date().getFullYear()} ReWear. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
