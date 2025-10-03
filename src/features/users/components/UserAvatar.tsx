import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({
  user,
  ...props
}: {
  user: {
    imageUrl: string;
    name: string;
  };
} & React.ComponentProps<typeof Avatar>) {
  return (
    <Avatar {...props}>
      <AvatarImage src={user.imageUrl} alt={user.name} />
      <AvatarFallback>
        {user.name?.charAt(0)?.toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );
}
