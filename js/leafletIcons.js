var iconPath = "./css/img/"

var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: iconPath + "marker-shadow.png",
        /*iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]*/
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    }
});

var blackIcon = new LeafIcon({iconUrl: iconPath + "marker-icon-black.png"}),
    redIcon = new LeafIcon({iconUrl: iconPath + "marker-icon-red.png"}),
    greenIcon = new LeafIcon({iconUrl: iconPath + "marker-icon-green.png"}),
    blueIcon = new LeafIcon({iconUrl: iconPath + "marker-icon-blue.png"}),
    violetIcon = new LeafIcon({iconUrl: iconPath + "marker-icon-violet.png"}),
    yellowueIcon = new LeafIcon({iconUrl: iconPath + "marker-icon-yellow.png"}),
    greyIcon = new LeafIcon({iconUrl: iconPath + "marker-icon-grey.png"}),
    orangeIcon = new LeafIcon({iconUrl: iconPath + "marker-icon-orange.png"});
