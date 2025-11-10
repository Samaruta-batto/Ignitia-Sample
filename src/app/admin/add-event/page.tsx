
import { AddEventForm } from "@/components/admin/add-event-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AddEventPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">Create New Event</CardTitle>
            <CardDescription>
              Fill out the details below to add a new event to the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddEventForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
