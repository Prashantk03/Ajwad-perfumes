export default function Footer() {
  return (
    <footer className="bg-blue-950 text-gray-300 pt-16 ">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Ajwad Perfumes
          </h3>
          <p className="text-sm leading-relaxed">
            Discover premium oud, attar, and luxury fragrances crafted for
            elegance, confidence, and timeless appeal.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Shop</li>
            <li className="hover:text-white cursor-pointer">Collections</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Email: support@ajwadperfumes.com</li>
            <li>Phone: +91 XXXXX XXXXX</li>
            <li className="flex gap-4 mt-4">
              <span className="hover:text-white cursor-pointer">Instagram</span>
              <span className="hover:text-white cursor-pointer">Facebook</span>
              <span className="hover:text-white cursor-pointer">Twitter</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ajwad Perfumes. All rights reserved.
      </div>
    </footer>
  );
}
