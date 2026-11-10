
const wavelengthSlider = document.getElementById("wavelength");
const slitSlider = document.getElementById("slitSeparation");
const distanceSlider = document.getElementById("screenDistance");

const runButton = document.getElementById("run");
const canvas = document.getElementById("pattern");
const ctx = canvas.getContext("2d");

// Run simulation only when button is clicked
runButton.addEventListener("click", function () {

    // Get the latest slider values
    const wavelength = Number(wavelengthSlider.value);
    const slitSeparation = Number(slitSlider.value);
    const screenDistance = Number(distanceSlider.value);

    // Calculate fringe width in mm
    const beta = (wavelength * 0.001 * screenDistance) / slitSeparation;

    // Draw interference pattern
    const width = canvas.width;
    const height = canvas.height;

    const imageData = ctx.createImageData(width, height);

    const displayWidth = 10; // Screen width in mm

    for (let x = 0; x < width; x++) {

        const position = (x / width - 0.5) * displayWidth;

        const intensity = Math.pow(
            Math.cos(Math.PI * position / beta), 2
        );

        const brightness = Math.round(intensity * 255);

        for (let y = 0; y < height; y++) {
            const index = (y * width + x) * 4;

            imageData.data[index] = brightness;
            imageData.data[index + 1] = brightness;
            imageData.data[index + 2] = 0;
            imageData.data[index + 3] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    // Display simulation results
    document.getElementById("fringeWidth").textContent =
        beta.toFixed(4) + " mm";

});
