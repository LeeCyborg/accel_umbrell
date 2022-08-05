/* Umbrella, modified from  FireFlies
*/
export var analogInputs = array(5)
export var accelerometer = array(3)

sparkHue = accelerometer[0]       // Set the hue for each spark
sparkSaturation = 1  // Set the saturation for each spark (0 = white)
numSparks = 10 + floor(pixelCount / 100)  // Scale number of sparks based on # LEDs
decay = .99          // Decay their energy/speed. Use .999 for slower
maxSpeed = .6        // The maximum initial speed of any spark / firefly
newThreshhold = .01  // Recycle any spark under this energy

sparks = array(numSparks)
sparkX = array(numSparks)
pixels = array(pixelCount)


export function beforeRender(delta) {
  delta *= .1
  
  for (i = 0; i < pixelCount; i++) pixels[i] *= .9 // Air cooling
  
  for (i = 0; i < numSparks; i++) {
    // Recycle dead sparks
    if (abs(sparks[i]) <= newThreshhold) {
      sparks[i] = (maxSpeed / 2) - random(maxSpeed)
      sparkX[i] = random(pixelCount)
    }
    
    sparks[i] *= decay  // Spark energy decay
    sparkX[i] += sparks[i] * delta  // Advance each position ∝ its energy
    
    // Allow sparks to loop around each end
    if (sparkX[i] >= pixelCount) sparkX[i] = 0
    if (sparkX[i] < 0) sparkX[i] = pixelCount - 1
    
    // Heat up the pixel at this spark's X position
    pixels[floor(sparkX[i])] += sparks[i]
  }
}

export function render(index) { 
  sparkHue = accelerometer[0] // hsv taken from accel axis

    if(analogInputs[0] < 0.3){
  v = pixels[index]
  hsv(sparkHue+random(0.1), sparkSaturation, v * v * 10)
    } 
}
