import { Template } from "tinacms";

export const jotFormBookingButtonSchema: Template = {
    name: 'BookingButton',
    label: 'JotForm Booking Button',
    fields: [
        {
            type: 'string',
            label: 'Title',
            name: 'Title',
        },
        {
            name: 'JotFormId',
            label: 'JotFormId',
            type: 'string'
        }
        
    ]


}