import Link from "next/link";

export default function Navbar(): JSX.Element {
    return (
        <div className="bg-neutral-950">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-white text-2xl">GamifyMe</div>
                <Link className="hover:font-bold hover:underline" href="/landing"> landing </Link>
                <Link className="hover:font-bold hover:underline" href="/home"> home </Link>
                <Link className="hover:font-bold hover:underline" href="/register"> register </Link>
            </div>
        </div>
    );
}