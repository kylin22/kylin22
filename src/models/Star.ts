class Star {
    public color: string;
    public type: string;
    public starClass: string;
    public temperature: number;
    public luminosity: number;

    constructor(color: string, type: string, starClass: string, temperature: number, luminosity: number) {
        this.color = color;
        this.type = type;
        this.starClass = starClass;
        this.temperature = temperature;
        this. luminosity = luminosity;
    }
}

const stars: Star[] = [
    new Star("#9db4ff", "star", "O5", 33000, 30000),
    new Star("#a2b9ff", "star", "B1", 26500, 28000),
    new Star("#a7bcff", "star", "B3", 24000, 27000),
    new Star("#aabfff", "star", "B5", 21500, 26000),
    new Star("#afc3ff", "star", "B8", 19500, 25000),
    new Star("#baccff", "star", "A1", 9650, 22),
    new Star("#c0d1ff", "star", "A3", 9150, 18),
    new Star("#cad8ff", "star", "A5", 8650, 14),
    new Star("#e4e8ff", "star", "F0", 6650, 4.5),
    new Star("#edefff", "star", "F2", 6400, 4),
    new Star("#f8f8ff", "star", "F5", 6150, 3.5),
    new Star("#fff9f9", "star", "F8", 5900, 3),
    new Star("#fff5ec", "star", "G0", 5650, 1.4),
    new Star("#fff4e8", "star", "G2", 5500, 1.2),
    new Star("#ffebd1", "star", "G5", 5150, 0.9),
    new Star("#ffdfb1", "star", "G8", 4900, 0.7),
    new Star("#ffd2a1", "star", "K0", 4600, 0.5),
    new Star("#ffc690", "star", "K4", 4150, 0.3),
    new Star("#ffbe7f", "star", "K7", 3600, 0.2),
    new Star("#ffbb7b", "star", "M2", 3100, 0.06),
    new Star("#ffbb7b", "star", "M4", 2900, 0.05),
    new Star("#ffbb7b", "star", "M6", 2600, 0.04),

    new Star("#e6d1ff", "quasar", "AGN", 4e9, 1e14),
    new Star("#5cb1db", "quasar", "AGN", 1e7, 5e12),
    new Star("#a2d9f5", "quasar", "AGN", 2e9, 1.5e14),
    new Star("#a2bbf5", "quasar", "AGN", 4.5e9, 2e14),

    new Star("#00ffec", "pulsar", "Type II", 1e6, 1e5),
    new Star("#49d6ff", "pulsar", "Type I", 7e5, 4e4),
    new Star("#a463f2", "magnetar", "Type II", 1.5e6, 8e5),
    new Star("#b8a2f5", "magnetar", "Type I", 8e5, 7e4)
];


export { Star, stars };