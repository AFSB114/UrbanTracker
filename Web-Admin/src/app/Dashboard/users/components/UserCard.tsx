
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit, Trash2, Mail } from "lucide-react";

import type { User as UserType } from "../types/userTypes";

interface UserCardProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => onEdit(user);

  return (
    <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
              <User className="h-8 w-8 text-accent" />
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {user.name}
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">Email:</span>
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" onClick={() => onDelete(user.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
