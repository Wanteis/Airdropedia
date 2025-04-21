import React from 'react';

const Footer = () => (
  <footer className="w-full bg-card border-t border-accent2/10 pt-12 pb-4 mt-12 text-muted text-sm">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8 justify-center text-center">
        {/* About */}
        <div>
          <h3 className="text-base font-bold text-white mb-3">About</h3>
          <ul className="space-y-2">
            <li><a href="/Public/Airdropedia_About_Us.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">About Us</a></li>

            <li><a href="https://x.com/Wanxeii" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Contact</a></li>
          </ul>
        </div>
        {/* Resources */}
        <div>
          <h3 className="text-base font-bold text-white mb-3">Resources</h3>
          <ul className="space-y-2">
            <li><a href="/Public/Airdropedia_FAQ_DarkTheme.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">FAQ</a></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col items-center">
          <h3 className="text-base font-bold text-white mb-3">Follow Us</h3>
          <div className="flex flex-row justify-center gap-6 mt-2">
            {/* X icon */}
            <a
              href="https://x.com/Wanxeii"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-accent2 transition-all duration-200 group"
              aria-label="Follow on X"
            >
              <svg width="20" height="20" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-200 group-hover:scale-110 group-hover:[&>path]:fill-accent2">
                <rect width="120" height="120" rx="24" fill="none"/>
                <path d="M86.5 22H104L69.5 62.7L110 118H80.6L55.9 84.5L27.7 118H10L46.1 74.3L7 22H37.2L59.9 52.3L86.5 22ZM81.1 109H89.9L36.4 30.2H27.1L81.1 109Z" fill="white"/>
              </svg>
              <span className="sr-only">X</span>
            </a>
          </div>
        </div>
      </div>
      <hr className="border-accent2/10 mb-4" />
      <div className="text-center text-xs text-muted pb-2">&copy; {new Date().getFullYear()} Airdropedia.com. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer;
