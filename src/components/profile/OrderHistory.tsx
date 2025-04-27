
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function OrderHistory() {
  // In a real app, this would fetch from an API
  const orders = [
    {
      id: "ORD-001",
      date: "2024-04-27",
      total: 125.99,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-002",
      date: "2024-04-25",
      total: 89.99,
      status: "Processing",
      items: 2,
    },
    {
      id: "ORD-003",
      date: "2024-04-22",
      total: 45.50,
      status: "Delivered",
      items: 1,
    },
    {
      id: "ORD-004",
      date: "2024-04-18",
      total: 199.99,
      status: "Delivered",
      items: 4,
    },
    {
      id: "ORD-005",
      date: "2024-04-15",
      total: 75.50,
      status: "Cancelled",
      items: 2,
    },
    {
      id: "ORD-006",
      date: "2024-04-10",
      total: 150.00,
      status: "Delivered",
      items: 3,
    }
  ];

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Button variant="link">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
