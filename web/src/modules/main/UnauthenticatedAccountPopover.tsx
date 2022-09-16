import { Anchor } from "../../common/ui/Anchor";

const links = [
  {
    label: "Sign in",
    href: "/account/sign-in",
  },
  {
    label: "Sign up",
    href: "/account/sign-up",
  },
];

export const UnauthenticatedAccountPopover = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <Anchor href={link.href}>{link.label}</Anchor>
          </li>
        ))}
      </ul>
    </nav>
  );
};
