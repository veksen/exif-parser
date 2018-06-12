const exifParser = require("exif").ExifImage;
const glob = require("glob-promise");

const Parser = (pattern, cb) => {
  let output = [];

  const handleImage = async image => {
    new exifParser({ image }, (error, exifData) => {
      try {
        if (error) throw error.message;

        console.log("c");
        console.log(image);

        // console.log(image);
        const { FocalLengthIn35mmFormat, ExposureTime, ISO, FNumber, LensModel } = exifData.exif;
        output.push({
          image,
          focalLength: FocalLengthIn35mmFormat,
          apertureSpeed: ExposureTime,
          apertureLength: FNumber,
          iso: ISO,
          lens: LensModel
        });
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    });
  };

  const handleImages = async images => {
    for (const image of images) {
      await handleImage(image);
    }

    console.log("done?");
  };

  const run = async () => {
    console.log("a");
    const files = await glob.promise(pattern, (err, files) => {
      if (err) return err;

      console.log("b");
      files.forEach(image => handleImage(image));
      console.log("d");
      console.log(output);
    });

    console.log("abc");

    console.log("e");
    console.log(output);

    return output;
  };

  return {
    output,
    run
  };
};

module.exports = {
  Parser
};

Parser("./photos/*.jpg").run();
