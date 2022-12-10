const NodeStl = require("node-stl");
const args = process.argv.slice(2);

const quality = args[0];
const fileName = args[1];

const stl = new NodeStl(__dirname + "/public/uploads/" + fileName, {
  density: 1.04
});

const fillamentPrice = 0.57;
const oneMeterValue = 6;
const kwsPrice = 0.000175;

const printPrice = (stl.volume * fillamentPrice) / oneMeterValue;
const powerConsumption = printingTime(stl.volume, quality) * kwsPrice;

const response = {
  stl: stl,
  fileName: fileName,
  price: Math.round(
    ((Math.round(printPrice) + Math.round(powerConsumption)) * 1.5 +
      10 +
      30) *
      1.19
  )
};

console.log(JSON.stringify(response));

function printingTime(volume, quality) {
  const availableLayersWeight = [0.1, 0.2, 0.3, 0.4];
  const avaiableSpeeds = [20, 40, 60, 80];
  let selectedLayerWeight = availableLayersWeight[quality];
  let selectedSpeed = avaiableSpeeds[quality];
  let layerWeight = 0.2;
  let speed = 20;

  if (selectedLayerWeight) {
    layerWeight = selectedLayerWeight;
    speed = selectedSpeed;
  }

  let volumeOrigin = 3.14 * Math.pow(layerWeight / 2, 2) * speed * 0.001;

  return volume / volumeOrigin;
}
