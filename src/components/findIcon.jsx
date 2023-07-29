const findIcon = (condition) => {
    let icon;
    switch (condition) {
        case "Clear":
        icon = "sun";
        break;
        case "Rain":
        icon = "droplet";
        break;
        case "Sunny":
        icon = "sun";
        break;
        case "Thunderstorm":
        icon = "cloud-meatball";
        break;
        case "Cloudy":
        icon = "cloud";
        break;
        case "Blizzard":
        icon = "icicles";
        break;
        case "Fog":
        icon = "smog";
        break;
        case "Drizzle":
        icon = "cloud-rain";
        break;
        case "Snow":
        icon = "snowflake";
        break;
        default:
        icon = "cloud";
    }
    return icon;
};

export default findIcon;
