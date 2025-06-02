import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg p-4 sticky top-0 left-4 right-4 z-10">
      <h1 className="text-2xl font-bold">Dessert Shop</h1>
      <div className="flex gap-4">
        <Link href="/" className="text-neutral-700 font-semibold">
          Home
        </Link>
        <Link href="/order" className="text-neutral-700 font-semibold">
          Order
        </Link>
      </div>
    </div>
  );
};
export default Header;
