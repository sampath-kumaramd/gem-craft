import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="  m-4">
        <span className=" text-red-600">Note -</span> This will be your website
        and i need to place bellow button to website. <br /> you can navigate to
        design board with bellow button.<br/>
        you need to add user name and passowrd to login to design board.
      </div>
      <div className="justify-center items-center flex align-middle h-[88vh]">
        <Link href="/category-data">
          <Button>Make Your Own Design Here...</Button>
        </Link>
      </div>
    </>
  );
}
