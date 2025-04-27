
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AdminUsers() {
  // Mock data - in a real app, this would come from an API
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      isLoyaltyMember: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+0987654321",
      isLoyaltyMember: false,
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@example.com",
      phone: "+1122334455",
      isLoyaltyMember: true,
    },
    {
      id: 4,
      name: "Emily Williams",
      email: "emily@example.com",
      phone: "+5566778899",
      isLoyaltyMember: true,
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert@example.com",
      phone: "+1357924680",
      isLoyaltyMember: false,
    },
    {
      id: 6,
      name: "Lisa Davis",
      email: "lisa@example.com",
      phone: "+2468013579",
      isLoyaltyMember: true,
    }
  ];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Loyalty Member</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.isLoyaltyMember ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
