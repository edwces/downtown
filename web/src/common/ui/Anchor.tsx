import Link from "next/link";
import { DetailedHTMLProps, AnchorHTMLAttributes } from "react";

type AnchorProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & { href: string };

export const Anchor = ({ href, children, ...props }: AnchorProps) => {
  return (
    <Link href={href}>
      <a {...props} className="text-primary-700 hover:underline">
        {children}
      </a>
    </Link>
  );
};
