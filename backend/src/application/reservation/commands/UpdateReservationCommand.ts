export class UpdateReservationCommand {
    constructor(
        public readonly id: number,
        public readonly startTime?: Date,
        public readonly endTime?: Date
    ) {}
}