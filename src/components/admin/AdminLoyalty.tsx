
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function AdminLoyalty() {
  // Mock data - in a real app, this would come from an API
  const loyaltyData = [
    {
      id: 1,
      user: "John Doe",
      points: 500,
      tier: "Gold",
      lastActivity: "2024-04-27",
    },
    {
      id: 2,
      user: "Jane Smith",
      points: 250,
      tier: "Silver",
      lastActivity: "2024-04-25",
    },
    {
      id: 3,
      user: "Michael Johnson",
      points: 750,
      tier: "Platinum",
      lastActivity: "2024-04-28",
    },
    {
      id: 4,
      user: "Emily Williams",
      points: 175,
      tier: "Bronze",
      lastActivity: "2024-04-26",
    },
    {
      id: 5,
      user: "Robert Brown",
      points: 425,
      tier: "Gold",
      lastActivity: "2024-04-27",
    },
    {
      id: 6,
      user: "Lisa Davis",
      points: 600,
      tier: "Platinum",
      lastActivity: "2024-04-29",
    }
  ];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Last Activity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loyaltyData.map((data) => (
            <TableRow key={data.id}>
              <TableCell>{data.user}</TableCell>
              <TableCell>{data.points}</TableCell>
              <TableCell>{data.tier}</TableCell>
              <TableCell>{data.lastActivity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
