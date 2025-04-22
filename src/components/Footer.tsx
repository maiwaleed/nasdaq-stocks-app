export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-4 w-screen">
      <div className="container mx-auto px-4 text-center text-gray-600">
        &copy; {new Date().getFullYear()} Stock Market App. All rights reserved.
        <p className="text-cyan-600 text-[0.8rem]">developed by Mai Waleed</p>
      </div>
    </footer>
  );
}
