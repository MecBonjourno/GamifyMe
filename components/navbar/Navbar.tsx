import Link from "next/link";

export default function Navbar(): JSX.Element {
    return (
        <div className="bg-neutral-950">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-white text-2xl">GamifyMe</div>
                <Link href="/landing"> landing </Link>
                <Link href="/home"> home </Link>
                <Link href="/register"> register </Link>
            </div>
        </div>
    );
}