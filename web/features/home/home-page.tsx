"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export const HomePage = () => {
  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <Card>
        <CardHeader>Hello</CardHeader>
        <CardContent className="space-y-2">This is my $1 Billion app.</CardContent>
        <CardFooter className="gap-2"></CardFooter>
      </Card>
    </div>
  );
};
