
const fs = require('fs');
const path = require('path');
const exec = require( 'child_process' ).execSync;

const glbCompiler = {

    compileFile: (filename) => {

        console.log(`Compiling ${filename}...`);

        let dirname = path.dirname(filename);
        let basename = path.basename(filename, '.gltf');
        let outputFile = path.join(dirname, 'output/', `${basename}-optimized.glb`);
        if (fs.existsSync(outputFile)) {
            console.log(` --> Exists (skipped): ${basename}-optimized.glb`);
            return;
        }
        let output = exec(`node ./node_modules/gltf-pipeline/bin/gltf-pipeline.js -i ${filename} -c -b`);

        if (output.stderr != null)
            console.log( `error: ${output.stderr.toString()}` );

        if (output.stdout != null)
            console.log( `${output.stdout.toString()}` );

        return true;
    },

    compile: (folder) => {
        let fileNames =  fs.readdirSync(folder);
        fileNames
            .filter((x) => x.endsWith('.gltf'))
            .forEach((x) => {
                glbCompiler.compileFile(path.join(folder, x));
            })
    }
}
//console.log(__dirname);
glbCompiler.compile(path.join(__dirname, '../resources/assets'));
