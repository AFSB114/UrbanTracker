
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Edit, Trash2, User, CreditCard } from "lucide-react";
import type { Driver } from "../types/driverTypes"; 

interface DriverCardProps {
  driver: Driver;
  onEdit: (driver: Driver) => void;
  onDelete: (id: number) => void;
}

export const DriverCard: React.FC<DriverCardProps> = ({
  driver,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => onEdit(driver);
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${driver.name}?`)) {
      onDelete(driver.id);
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors">
              <Users className="h-8 w-8 text-accent" />
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {driver.name}
                </h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="font-medium">Name:</span>
                  <span>{driver.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="h-4 w-4" />
                  <span className="font-medium">ID:</span>
                  <span className="font-mono bg-muted px-2 py-1 rounded text-foreground">
                    {driver.identification}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEdit}
              className="flex items-center gap-2 hover:bg-accent/10 hover:text-accent transition-all duration-200"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDelete}
              className="border-red-700 text-red-500 hover:bg-red-900/20 transition-all duration-200"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};