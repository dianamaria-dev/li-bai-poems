// ========== SAKURA PETALS ANIMATION (Starbucks Taiwan Spring 2019) ==========

function random(n) {
    return Math.floor(Math.random() * n) + 1;
}

function Canvas(elm) {
    this.elm = elm;
    this.canvasCtx = this.elm.getContext('2d');
    this.width = this.elm.width;
    this.height = this.elm.height;
    this.children = [];
    this.fallenSakura = 0;

    this.init();
}

Canvas.prototype = {
    resize: function(boolean) {
        this.width = this.elm.width = boolean ? this.elm.parentNode.clientWidth * 2 : window.innerWidth * 2;
        this.height = this.elm.height = window.innerHeight;
    },
    clear: function() {
        this.canvasCtx.clearRect(0, 0, this.width, this.height);
    },
    addChild: function(child) {
        this.children.push(child);
    },
    removeChild: function(num) {
        this.children.splice(num, 1);
    },
    rendering: function() {
        this.clear();
        
        for (let i = this.children.length - 1; i >= 0; i--) {
            const child = this.children[i];
            if (child.draw(this.canvasCtx)) {
                this.removeChild(i);
            }
        }
    },
    createSakura: function(num, x1, y1, x2, y2) {
        const colors = ["#f29fb5", "#ea617c", "#f5cbd4"];
        for (let i = 0; i < num; i++) {
            const x_pos = Math.floor(Math.random() * (x2 - x1)) + x1;
            const y_pos = Math.floor(Math.random() * (y2 - y1)) + y1;
            this.addChild(new Sakura(
                this,
                x_pos,
                y_pos,
                Math.random() + 0.8,
                { x: random(360), y: random(360), z: random(360) },
                { x: random(5), y: random(5), z: random(2) },
                random(1),
                colors[random(3) - 1]
            ));
        }
    },
    animate: function() {
        const _this = this;
        const count = 30;
        
        // Add new petals randomly
        if (Math.random() > 0.98 && this.children.length < 40) {
            this.createSakura(count, 100, 1, this.width, 300);
        }
        
        this.rendering();
        
        requestAnimationFrame(function() {
            _this.animate();
        });
    },
    init: function() {
        this.resize(true);
        // Create initial petals
        this.createSakura(40, 100, 1, this.width, 500);
        this.animate();
    }
};

function Sakura(parent, x, y, scale, direction, rotate, wind, color) {
    this.parent = parent;
    this.x_pos = x;
    this.y_pos = y;
    this.scale = scale;
    this.direction = direction;
    this.rotate = rotate;
    this.wind = wind;
    this.gr = 2;
    this.phase = 0;
    this.color = color;
}

Sakura.prototype = {
    draw: function(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x_pos, this.y_pos);
        
        ctx.rotate(this.direction.y / 100 * Math.PI);
        ctx.scale(this.scale, this.scale);
        ctx.fillStyle = this.color;
        
        const x_rad = Math.cos(this.direction.x * Math.PI / 100);
        const z_rad = Math.cos(this.direction.z * Math.PI / 100);
        
        ctx.moveTo(-6 * z_rad, -10 * x_rad);
        ctx.bezierCurveTo(-10 * z_rad, 0 * x_rad, -5 * z_rad, 10 * x_rad, 0 * z_rad, 10 * x_rad);
        ctx.bezierCurveTo(0 * z_rad, 0 * x_rad, 0 * z_rad, 0 * x_rad, -1 * z_rad, -1 * x_rad);
        ctx.fill();
        ctx.restore();
        
        return this.moveSakura();
    },
    moveSakura: function() {
        let move_y;
        
        if (this.phase === 0) {
            const ground = 1 + (this.scale / 10);
            if (this.y_pos > this.parent.height * ground) {
                this.gr = 0;
                this.wind = 0;
                this.rotate.x = 0;
                this.rotate.y = 0;
                this.rotate.z = 0;
                this.phase = 1;
                this.parent.fallenSakura++;
            }
        } else if (this.phase === 2) {
            if (this.gr > -3) this.gr += this.gr / 10;
            move_y = (this.gr * this.scale);
        }
        
        this.y_pos = this.y_pos + (this.gr * this.scale) / 2;
        this.x_pos = this.x_pos + this.wind / -2;
        this.direction.x += this.rotate.x / 3;
        this.direction.y += this.rotate.y / 3;
        this.direction.z += this.rotate.z / 3;
        
        if (this.x_pos > this.parent.width) return true;
        return this.y_pos > this.parent.height ? true : false;
    }
};

// Initialize the animation when the page loads
document.addEventListener("DOMContentLoaded", function() {
    let canvas = document.getElementById("sakura");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.id = "sakura";
        canvas.className = "sakura";
        // Insert at the beginning of body (behind everything)
        document.body.insertBefore(canvas, document.body.firstChild);
    }
    
    // Style the canvas
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "0";  // Behind everything
    
    const SakuraCanvas = new Canvas(canvas);
    
    window.addEventListener("resize", function() {
        SakuraCanvas.resize(true);
    });
});