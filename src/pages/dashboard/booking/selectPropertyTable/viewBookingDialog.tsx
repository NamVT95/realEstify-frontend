import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { format, set } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/formatting";
import { Button } from "@/components/ui/button";
import { acceptBooking } from "@/lib/api/acceptBooking";
import { useState } from "react";
import { useAppDispatch } from "@/hooks/useStore";
import { switchTrigger } from "@/store/renderTrigger";
import { rejectBooking } from "@/lib/api/rejectBooking";

interface ViewBookingDialogProps {
    open: boolean;
    setOpen?: (value: boolean) => void;
    row?: any;
    table?: any;
}

export default function ViewBookingDialog({
    open,
    setOpen,
    row,
}: ViewBookingDialogProps) {
    const [isloading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleReject = async () => {
        await rejectBooking(row.BookingId).then(() => {
            setIsLoading(false);
            setOpen && setOpen(false);
        }).finally(() => {
            dispatch(switchTrigger())
        });
    };

    const handleAccept = async () => {
        setIsLoading(true);
        await acceptBooking(row.BookingId).then(() => {
            setIsLoading(false);
            setOpen && setOpen(false);
        }).finally(() => {
            dispatch(switchTrigger())
        });
    };
    return (
        <div>
            <Dialog
                open={open}
                onOpenChange={() => {
                    setOpen && setOpen(false);
                }}
            >
                <DialogContent className="min-w-[800px]">
                    <DialogHeader>
                        <DialogTitle>Booking #{row.BookingId}</DialogTitle>
                        <DialogDescription>
                            {format(new Date(row.BookingDate), "HH:mm dd/MM/yyyy")}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1 space-y-2">
                            <img
                                src={row.Project.Thumbnail}
                                alt=""
                                className="object-cover rounded-md"
                            />
                            <div>
                                <div className="font-bold text-primary">{row.Project.Name}</div>
                                <div>{row.Project.Location}</div>
                            </div>
                        </div>
                        <div className="col-span-1 space-y-2">
                            <div className="font-semibold text-lg">
                                Customer #{row.CustomerId}
                            </div>
                            <Separator />
                            <div className="space-y-1">
                                <div className="flex gap-2">
                                    <div className="text-gray-600">Full Name:</div>
                                    <div className="font-bold text-primary">
                                        {row.Customer.FullName}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="text-gray-600">Email:</div>
                                    <div>{row.Customer.Email}</div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="text-gray-600">Phone:</div>
                                    <div>{row.Customer.PhoneNumber}</div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="font-semibold text-lg">
                                    Booking Details #{row.BookingId}
                                </div>
                                <Separator />
                                <div className="flex gap-2">
                                    <div className="text-gray-600">Booking Date:</div>
                                    <div>
                                        {format(new Date(row.BookingDate), "HH:mm dd/MM/yyyy")}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="text-gray-600">Selection Method:</div>
                                    <div>{row.SelectionMethod}</div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="text-gray-600">Booking Status:</div>
                                    <Badge>{row.Status}</Badge>
                                </div>
                                <div className="flex gap-2">
                                    <div className="text-gray-600">Deposit :</div>
                                    <div>{formatPrice(row.AmountDeposit)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <DialogFooter>
                        {isloading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="flex gap-3">
                                <Button
                                    className="btn bg-destructive hover:bg-destructive/80"
                                    onClick={handleReject}
                                >
                                    Reject
                                </Button>
                                <Button className="btn bg-primary" onClick={handleAccept}>
                                    Accept
                                </Button>
                            </div>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
