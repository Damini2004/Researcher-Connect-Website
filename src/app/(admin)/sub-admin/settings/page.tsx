import ProfileSettingsForm from "@/components/forms/profile-settings-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Profile Settings</h1>
                <p className="text-muted-foreground">Manage your account information. Changes require super admin approval.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>Submit a request to update your profile details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileSettingsForm />
                </CardContent>
            </Card>
        </div>
    );
}
