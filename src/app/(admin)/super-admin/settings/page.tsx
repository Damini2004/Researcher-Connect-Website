
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPaymentUrl } from "@/services/settingsService";
import PaymentSettingsForm from "@/components/forms/payment-settings-form";

export default async function SettingsPage() {
    const { url: currentPaymentUrl } = await getPaymentUrl();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Application Settings</h1>
                <p className="text-muted-foreground">Manage global settings for the application.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Payment Settings</CardTitle>
                    <CardDescription>
                        Set the payment URL that will be sent to authors in the approval email.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PaymentSettingsForm currentUrl={currentPaymentUrl} />
                </CardContent>
            </Card>
        </div>
    );
}
