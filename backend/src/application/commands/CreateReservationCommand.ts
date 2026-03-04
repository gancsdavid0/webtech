export class CreateReservationCommand {
    constructor(
        public readonly userId: number,
        public readonly spotId: number,
        public readonly startTime: Date,
        public readonly endTime: Date
    ) {}
}