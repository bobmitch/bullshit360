var models=[];
var active_scene=null;

class Model {
    constructor(name) {
        this.name = name;
        this.scenes = [];
    }
    render() {
        console.log('Rendering', this.name);
        // loop over scenes inside model
        for (const scene_key in this.scenes) {
            console.log('Rendering scene',this.scenes[scene_key]);
            // create scene markup
            let scene_el = document.createElement('DIV');
            scene_el.classList.add('scene');
            if (this.scenes[scene_key].default) {
                scene_el.classList.add('active');
            }
            for (var i=0; i<this.scenes[scene_key].framecount; i++) {
                // create scene frames
                let frame = document.createElement("IMG");
                frame.classList.add('frame');
                if (i==0) {
                    frame.classList.add('active');
                }
                frame.src = this.scenes[scene_key].folder + "/"+ (i+1).toString() + ".jpg";
                scene_el.appendChild(frame);
            }
            document.getElementById('animations_wrap').appendChild(scene_el);
        } 
    }
}

class Scene {
    constructor(name, folder, framecount) {
        this.name = name;
        this.folder = folder;
        this.framecount = framecount;
        this.cur_frame = 0;
        this.must_reset = true;
        this.default = false;
        this.playing = false;
        this.direction = 1; // 1 forwards. -1 backwards.
    }
    reset(callback) {
        // go back to initial frame and then execute callback
        this.playing = false;
        window.active_scene = null;
        callback();
    }
    play() {
        // first check if we can play scene right now
        // might have to wait / reset old scene first
        if (window.active_scene) {
            if (window.active_scene.must_reset) {
                window.active_scene.reset(this.play_scene); // pass callback
            }
        }
        else {
            window.active_scene = this;
            // do stuff
            this.playing = true;
        }
    }
}

// create models+scenes
const voltron = new Model("voltron");
voltron.scenes['spin'] =  new Scene("Spin", "Voltron360", 72) ;
voltron.scenes['spin'].default = true;
voltron.render();

models.push(voltron);


voltron.scenes.spin.play();



