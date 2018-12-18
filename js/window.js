/**
 * The Superclass of all windows within the game.
 * 
 * @class Window_Base
 * @extends SpriteCanvas
 * @property {String} _skin - path to window skin image
 * @property {Object} _renderedObjects - information of rendered stuffs
 * @property {Array.<Object>} drawnObjects - the objects drawn on the window
 * @property {Array.<Sprite>} borderSprites - collection border sprites
 * @property {Array.<Sprite>} arrowSprites - collection of arrow sprites
 * @property {Sprite} indexSprite - background of window index
 * @property {Sprite} patternSprite - pattern image of window background
 */
class Window_Base extends SpriteCanvas{
  /**-------------------------------------------------------------------------
   * @constructor
   * @memberof Window_Base
   * @param {Number} x - X position in app
   * @param {Number} y - Y position in app
   * @param {Number} w - width of canvas, overflowed content will be hidden
   * @param {Number} h - height of canvas, overflowed content will be hidden
   */
  constructor(x = 0, y = 0, w = 300, h = 150){
    super(x, y, w, h);
    this.drawnObjects = [];
    this.changeSkin(Graphics.DefaultWindowSkin);
  }
  /*------------------------------------------------------------------------*/
  get itemWidth(){
    return this.width - this.padding;
  }
  /*------------------------------------------------------------------------*/
  get itemHeight(){
    return this.lineHeight + this.spacing;
  }
  /**------------------------------------------------------------------------
   * Change window skin
   */
  changeSkin(skin_name){
    this._skin = skin_name;
    this.applySkin();
    this.resize(this.width, this.height);
  }
  /*------------------------------------------------------------------------*/
  cursorRect(index){
    let rect = new Rect(0,0,0,0);
    let pos  = this.getIndexItemPOS(index);
    rect.x = pos.x - this.spacing;
    rect.y = pos.y - this.spacing;
    rect.width = this.itemWidth;
    rect.height = this.itemHeight;
    return rect;
  }
  /**-------------------------------------------------------------------------
   * > Frame update
   * @memberof Window_Base
   */
  update(){
    this.updateCursor();
  }
  /*------------------------------------------------------------------------*/
  updateCursor(){
    if(this.cursorSprite.visible){
      let sp = this.cursorSprite;
      let delta = 0.02 * Graphics.speedFactor;
      if(!sp.uFlag){
        sp.setOpacity(sp.opacity - delta);
        if(sp.opacity < 0.1){sp.uFlag = true;}
      }
      else{
        sp.setOpacity(sp.opacity + delta);
        if(sp.opacity >= 1){sp.uFlag = false;}
      }
    }
  }
  /**------------------------------------------------------------------------
   * @param {boolean} all - remove all children (dispose)
   */
  clear(all = false){
    for(let i=0;i<this.drawnObjects.length;++i){
      if(this.drawnObjects[i].destroy){
        this.drawnObjects[i].destroy({children: true});
      }
      this.removeChild(this.drawnObjects[i]);
    }
    this.drawnObjects = [];
    if(all){super.clear();}
  }
  /*-------------------------------------------------------------------------*/
  get padding(){return Graphics.padding;}
  get spacing(){return Graphics.spacing;}
  get lineHeight(){return Graphics.lineHeight;}
  /**-------------------------------------------------------------------------
   * > Draw window skin
   */
  applySkin(){
    this.drawSkinIndex();
    this.drawSkinPattern();
    this.drawSkinArrows();
    this.drawSkinCursor();
    this.drawSkinButton();
    this.drawSkinBorder();
  }
  /**-------------------------------------------------------------------------
   * > Draw the border of skin
   */
  drawSkinBorder(){
    if(this.borderSprites){
      this.borderSprites.forEach(function(sp){
        this.removeChild(sp);
        sp.clear();
      }.bind(this))
      this.borderSprites = [];
    }

    let tUL = Graphics.loadTexture(this._skin, Graphics.wSkinBorderUL);
    let tUP = Graphics.loadTexture(this._skin, Graphics.wSkinBorderUP);
    let tUR = Graphics.loadTexture(this._skin, Graphics.wSkinBorderUR);
    let tBL = Graphics.loadTexture(this._skin, Graphics.wSkinBorderBL);
    let tBT = Graphics.loadTexture(this._skin, Graphics.wSkinBorderBT);
    let tBR = Graphics.loadTexture(this._skin, Graphics.wSkinBorderBR);
    let tLT = Graphics.loadTexture(this._skin, Graphics.wSkinBorderLT);
    let tRT = Graphics.loadTexture(this._skin, Graphics.wSkinBorderRT);
    
    this.borderSpriteUL = new Sprite(tUL);
    this.borderSpriteUP = new Sprite(tUP);
    this.borderSpriteUR = new Sprite(tUR);
    this.borderSpriteBL = new Sprite(tBL);
    this.borderSpriteBT = new Sprite(tBT);
    this.borderSpriteBR = new Sprite(tBR);
    this.borderSpriteLT = new Sprite(tLT);
    this.borderSpriteRT = new Sprite(tRT);
    
    this.borderSprites = [
      this.borderSpriteUL, this.borderSpriteUP, this.borderSpriteUR,
      this.borderSpriteBL, this.borderSpriteBT, this.borderSpriteBR,
      this.borderSpriteLT, this.borderSpriteRT
    ]
    
    for(let i=0;i<this.borderSprites.length;++i){
      this.borderSprites[i].setZ(5).static = true;
      this.addChild(this.borderSprites[i]);
    }
  }
  /**-------------------------------------------------------------------------
   * > Draw the hover cursor of skin
   */
  drawSkinCursor(){
    if(this.cursorSprites){
      this.removeChild(this.cursorSprite);
      this.cursorSprites.forEach(function(sp){sp.clear();})
      this.cursorSprites = [];
      this.cursorSprite = null;
    }
    
    let tix = Graphics.loadTexture(this._skin, Graphics.wSkinCursorIndex);
    let tUL = Graphics.loadTexture(this._skin, Graphics.wSkinCursorUL);
    let tUP = Graphics.loadTexture(this._skin, Graphics.wSkinCursorUP);
    let tUR = Graphics.loadTexture(this._skin, Graphics.wSkinCursorUR);
    let tBL = Graphics.loadTexture(this._skin, Graphics.wSkinCursorBL);
    let tBT = Graphics.loadTexture(this._skin, Graphics.wSkinCursorBT);
    let tBR = Graphics.loadTexture(this._skin, Graphics.wSkinCursorBR);
    let tLT = Graphics.loadTexture(this._skin, Graphics.wSkinCursorLT);
    let tRT = Graphics.loadTexture(this._skin, Graphics.wSkinCursorRT);
    
    this.cursorSpriteIX = new Sprite(tix);
    this.cursorSpriteUL = new Sprite(tUL);
    this.cursorSpriteUP = new Sprite(tUP);
    this.cursorSpriteUR = new Sprite(tUR);
    this.cursorSpriteBL = new Sprite(tBL);
    this.cursorSpriteBT = new Sprite(tBT);
    this.cursorSpriteBR = new Sprite(tBR);
    this.cursorSpriteLT = new Sprite(tLT);
    this.cursorSpriteRT = new Sprite(tRT);

    let cursorSprites = [
      this.cursorSpriteIX,
      this.cursorSpriteUL, this.cursorSpriteUP, this.cursorSpriteUR,
      this.cursorSpriteBL, this.cursorSpriteBT, this.cursorSpriteBR,
      this.cursorSpriteLT, this.cursorSpriteRT
    ]

    this.cursorSpriteIX.setPOS(this.cursorSpriteUL.width, this.cursorSpriteUL.height)

    this.cursorSprite = new SpriteCanvas(0,0,32,32);
    for(let i=0;i < cursorSprites.length;++i){
      cursorSprites[i].setZ(1.5).static = true;
      this.cursorSprite.removeChild(cursorSprites[i]);
      this.cursorSprite.addChild(cursorSprites[i]);
    }

    this.cursorSprite.setZ(1.5).hide().static = true;
    this.addChild(this.cursorSprite);
  }
  /**-------------------------------------------------------------------------
   * > Draw the index background of skin
   */
  drawSkinIndex(){
    if(this.indexSprite){
      this.removeChild(this.indexSprite)
      this.indexSprite.clear();
      this.indexSprite = null;
    }
    let texture = Graphics.loadTexture(this._skin, Graphics.wSkinIndexRect);
    this.indexSprite = new Sprite(texture);
    this.indexSprite.setZ(0).setOpacity(0.5).static = true;
    this.addChild(this.indexSprite);
  }
  /**-------------------------------------------------------------------------
   * > Draw index pattern of skin
   */
  drawSkinPattern(){
    if(this.patternSprite){
      this.removeChild(this.patternSprite);
      this.patternSprite.clear();
      this.patternSprite = null;
    }
    let texture = Graphics.loadTexture(this._skin, Graphics.wSkinPatternRect);
    this.patternSprite = new Sprite(texture);
    this.patternSprite.setZ(1).setOpacity(0.5).static = true;
    this.addChild(this.patternSprite);
  }
  /**-------------------------------------------------------------------------
   * > Draw continue icon of skin
   */
  drawSkinButton(){
    if(this.buttonSprite){
      this.removeChild(this.buttonSprite);
      this.buttonSprite = null;
    }
    let rect  = Graphics.wSkinButton;
    rect.width /= 2; rect.height /= 2;
    let d = rect.width;
    let offset = [[0,0],[d,0],[0,d],[d,d]], textureArray = [];
    for(let i=0;i<4;++i){
      let srect = clone(rect);
      srect.x += offset[i][0]; srect.y += offset[i][1]
      textureArray.push(Graphics.loadTexture(this._skin, srect));
    }
    this.buttonSprite = new PIXI.extras.AnimatedSprite(textureArray);
    this.buttonSprite.setZ(3).static = true;
    this.buttonSprite.animationSpeed = 0.25;
    this.buttonSprite.hide();
    this.addChild(this.buttonSprite);
  }
  /**-------------------------------------------------------------------------
   * > Draw scroll arrows of skin
   */
  drawSkinArrows(){
    if(this.arrowSprites){
      this.arrowSprites.forEach(function(sp){
        this.removeChild(sp);
        sp.clear();
      }.bind(this))
      this.arrowSprites = [];
    }
    let tAU = Graphics.loadTexture(this._skin, Graphics.wSkinArrowUP);
    let tAD = Graphics.loadTexture(this._skin, Graphics.wSkinArrowBT);
    let tAL = Graphics.loadTexture(this._skin, Graphics.wSkinArrowLT);
    let tAR = Graphics.loadTexture(this._skin, Graphics.wSkinArrowRT);
    this.arrowDownSprite  = new Sprite(tAD);
    this.arrowUpSprite    = new Sprite(tAU);
    this.arrowLeftSprite  = new Sprite(tAL);
    this.arrowRightSprite = new Sprite(tAR);
    this.arrowSprites = [
      this.arrowDownSprite,  this.arrowLeftSprite,
      this.arrowRightSprite, this.arrowUpSprite
    ]
    for(let i=0;i<4;++i){
      this.arrowSprites[i].setZ(6).hide().static = true;
      this.addChild(this.arrowSprites[i]);
    }
  }
  /**-------------------------------------------------------------------------
   * > Draw Icon in Iconset
   * @param {Number} icon_index - the index of the icon in Iconset
   * @param {Number} x - the draw position of X
   * @param {Number} y - the draw position of Y
   */
  drawIcon(icon_index, x = 0, y = 0){
    x += this.padding / 2; y += this.padding / 2;
    let iconSprite = super.drawIcon(icon_index, x, y);
    this.drawnObjects.push(iconSprite);
    this.refresh();
    return iconSprite;
  }
  /**-------------------------------------------------------------------------
   * > Draw text inside the window
   * @param {String} text - the text to display
   * @param {Number} x - the x position of the text to draw
   * @param {Number} y - the y position of the text to draw
   * @param {Object} font - the font settings
   */
  drawText(x = 0, y = 0, text = '', font = Graphics.DefaultFontSetting, autowrap = false){
    if(!font){font = Graphics.DefaultFontSetting;}
    if(autowrap){text = this.textWrap(text);}
    let ts = new PIXI.Text(text, font);
    x += this.padding / 2; y += this.padding / 2;
    ts.setPOS(x, y).setZ(2);
    this.drawnObjects.push(ts);
    this.addChild(ts);
    this.refresh();
    return ts;
  }
  /*------------------------------------------------------------------------*/
  refresh(){
    super.refresh();
    this.checkArrowsVisibility();
  }
  /**------------------------------------------------------------------------
   * Check whether to show surplus navigation arrows 
   */
  checkArrowsVisibility(){
    for(let i=0;i<4;++i){
      if(this.surplusDirection & (1 << i) > 0){
        this.arrowSprites[i].show();
      }
    }
  }
  /**-------------------------------------------------------------------------
   * Resize the window, all static children will be adjusted
   * @param {Number} w - new width,  1 <= w <= 4096
   * @param {Number} h - new height, 1 <= h <= 4096
   */
  resize(w, h){
    w = Math.min(Math.max(1, w), 4096);
    h = Math.min(Math.max(1, h), 4096);
    super.resize(w, h);
    if(this.isDisposed()){return ;}
    
    // Window resize scale number
    let blen  = Graphics.wSkinBorderUP.width;
    let cblen = Graphics.wSkinBorderUL.width + Graphics.wSkinBorderUR.height;
    let brmpr = [(this.width - cblen) / blen, (this.height - cblen) / blen]
    let ixmpr = [this.width / Graphics.wSkinIndexRect.width, this.height / Graphics.wSkinIndexRect.height];

    // Resize index
    this.indexSprite.scale.set(ixmpr[0], ixmpr[1]);
    this.patternSprite.scale.set(ixmpr[0], ixmpr[1]);
    
    // Resize borders
    this.borderSpriteUP.scale.set(brmpr[0], 1);
    this.borderSpriteBT.scale.set(brmpr[0], 1);
    this.borderSpriteLT.scale.set(1, brmpr[1]);
    this.borderSpriteRT.scale.set(1, brmpr[1]);

    // Relocate borders
    this.borderSpriteUP.x = this.borderSpriteUL.width;
    this.borderSpriteUR.x = this.borderSpriteUP.x + this.borderSpriteUP.width;
    this.borderSpriteLT.y = this.borderSpriteUL.height;
    this.borderSpriteBL.y = this.borderSpriteLT.y + this.borderSpriteLT.height;
    this.borderSpriteBT.setPOS(this.borderSpriteUP.x, this.borderSpriteBL.y);
    this.borderSpriteBR.setPOS(this.borderSpriteUR.x, this.borderSpriteBL.y);
    this.borderSpriteRT.setPOS(this.borderSpriteUR.x, this.borderSpriteLT.y);

    // Resize & Relocate cursor
    let clen  = Graphics.wSkinCursorUP.width;
    let crect = this.cursorRect(0);
    let crmpr = [crect.width / clen, crect.height / clen]

    if(crmpr[0] < 1){crmpr[0] = 1;}
    if(crmpr[1] < 1){crmpr[1] = 1;}
    
    this.cursorSprite.resize(w, h);
    this.cursorSpriteIX.scale.set(crmpr[0], crmpr[1]);
    this.cursorSpriteUP.scale.set(crmpr[0], 1);
    this.cursorSpriteBT.scale.set(crmpr[0], 1);
    this.cursorSpriteLT.scale.set(1, crmpr[1]);
    this.cursorSpriteRT.scale.set(1, crmpr[1]);

    this.cursorSpriteUP.x = this.cursorSpriteUL.width;
    this.cursorSpriteUR.x = this.cursorSpriteUP.x + this.cursorSpriteUP.width;
    this.cursorSpriteLT.y = this.cursorSpriteUL.height;
    this.cursorSpriteBL.y = this.cursorSpriteLT.y + this.cursorSpriteLT.height;
    this.cursorSpriteBT.setPOS(this.cursorSpriteUP.x, this.cursorSpriteBL.y);
    this.cursorSpriteBR.setPOS(this.cursorSpriteUR.x, this.cursorSpriteBL.y);
    this.cursorSpriteRT.setPOS(this.cursorSpriteUR.x, this.cursorSpriteLT.y);

    // Relocate arrows
    let offset = [Graphics.wSkinArrowUP.width, Graphics.wSkinArrowUP.height];

    this.arrowUpSprite.setPOS((this.width - offset[0]) / 2, this.spacing);
    this.arrowLeftSprite.setPOS(this.spacing, (this.height - offset[0]) / 2);
    this.arrowDownSprite.setPOS(this.arrowUpSprite.x, this.height - this.spacing - offset[1])
    this.arrowRightSprite.setPOS(this.width - this.spacing - offset[1], this.arrowLeftSprite.y);

    // Relocate button
    this.buttonSprite.setPOS((this.width - this.spacing * 2) / 2, this.height - this.spacing * 2);

    return this;
  }
  /**-------------------------------------------------------------------------
   * > Dispose window
   */
  dispose(){
    SceneManager.scene.removeWindow(this);
  }
  /**-------------------------------------------------------------------------
   * > Check whether window has been disposed
   */
  isDisposed(){
    return this.children.length == 0;
  }
  /**------------------------------------------------------------------------
   * Get index rect position, reserved.
   */
  getIndexItemPOS(index){
    return {x: 0, y: 0};
  }
}
/**
 * The window that provides selectable item and arrange
 * @class Window_Selectable
 * @extends Window_Base
 * @property {Array.<Object>} _selections - the available selections
 */
class Window_Selectable extends Window_Base{
  /**-------------------------------------------------------------------------
   * @constructor
   * @memberof Window_Selectable
   */
  constructor(x, y, w, h){
    super(x, y, w, h);
    this._active     = false;
    this._selections = [];
    this._index      = -1;
    this.on('tap', this.onSelfTrigger.bind(this));
    this.on('click', this.onSelfTrigger.bind(this));
  }
  /**------------------------------------------------------------------------
   * Max item count in each row
   */
  get rowMax(){return 1;}
  /**------------------------------------------------------------------------
   * Max item count in each columnm
   */
  get colMax(){return -1;}
  /*------------------------------------------------------------------------*/
  get itemWidth(){
    return (this.width - this.padding) / this.rowMax;
  }
  /**------------------------------------------------------------------------
   * Get item padding direction
   */
  get isHorizontal(){return this.rowMax == -1;}
  get isVertical(){return this.colMax == -1;}
  /**-------------------------------------------------------------------------
   * > Frame update
   * @memberof Window_Selectable
   */
  update(){
    super.update();
  }
  /*------------------------------------------------------------------------*/
  clear(){
    super.clear();
    this._selections = [];
  }
  /*------------------------------------------------------------------------*/
  refresh(){
    super.refresh();
    this.syncChildrenProperties();
  }
  /*------------------------------------------------------------------------*/
  get currentItem(){
    return this._selections[this._index];
  }
  /*------------------------------------------------------------------------*/
  get isCurrentItemEnabled(){
    return true;
  }
  /*------------------------------------------------------------------------*/
  onSelfTrigger(){
    if(this.index < 0){return ;}
    debug_log(getClassName(this) + " triggered index: " + this.index);
    if(this.isCurrentItemEnabled){
      Sound.playOK();
    }
    else{
      Sound.playBuzzer();
    }
  }
  /**------------------------------------------------------------------------
   * > Synchronize child properties to parent's
   */
  syncChildrenProperties(){
    for(let i=0;i<this.children.length;++i){
      this.children[i].interactive = this.isActivate();
    }
  }
  /**-------------------------------------------------------------------------
   * > Activate to make selections interactable
   */
  activate(){
    super.activate();
    this.refresh();
    return this;
  }
  /**-------------------------------------------------------------------------
   * > Deactivate to make selections un-interactable
   */
  deactivate(){
    super.deactivate();
    this.refresh();
    return this;
  }
  /**------------------------------------------------------------------------
   * Add selection items to window
   * @param {...} item - the items to append, the handler should be
   *                           defined inside the item's EventListener
   */
  addSelection(){
    for(let i=0;i<arguments.length;++i){
      let item = arguments[i];
      let crect = this.cursorRect(this._selections.length);
      if(item){
        item.setZ((item.z || 0) + this.patternSprite.z + 1);
        item._index = this._selections.length;
        item.hitArea = new Rect(0,0,this.itemWidth, this.itemHeight);
        item.hitArea.x = crect.x - item.x;
        item.hitArea.y = crect.y - item.y;
        item.on('mouseover', this.onMouseover.bind(this, item));
        item.on('mouseout', this.onMouseOut.bind(this, item));
        this.addChild(item);
      }
      this._selections.push(item);
    }
    this.refresh();
  }
  /*------------------------------------------------------------------------*/
  onMouseover(item){
    if(item._index == this.index){return ;}
    this.select(item._index);
  }
  /*------------------------------------------------------------------------*/
  onMouseOut(item){
    if(item._index == this.index){
      this.unselect();
    }
  }
  /*------------------------------------------------------------------------*/
  setHelpWindow(win){
    this.helpWindow = win;
  }
  /*------------------------------------------------------------------------*/
  select(idx){
    this._index = idx;
    let crect = this.cursorRect(idx);
    this.cursorSprite.show();
    this.cursorSprite.setPOS(crect.x, crect.y);
    Sound.playCursor();
    if(this.helpWindow){
      if(this._index >= 0){
        this.helpWindow.setText(this.currentItem.help || '');
      }else{this.helpWindow.setText('');}
    }
  }
  /*------------------------------------------------------------------------*/
  unselect(){
    this._index = -1;
    this.cursorSprite.hide();
  }
  /**------------------------------------------------------------------------
   * Add pure text selection item
   * @param {Object} args - option object argument
   * @param {String} args.text - the text
   * @param {Object} [args.font=Graphics.DefaultFontSetting] - text font
   * @param {Number} [args.align=0] - text alignment, 0: left, 1: center, 2: right
   * @param {function} args.handler - the function to call when it's clicked
   */
  addTextSelection(args){
    if(!args.text){
      throw new TypeError(args.text, String);
    }
    if(!args.font){args.font = Graphics.DefaultFontSetting;}
    args.align |= 0;

    let item = new PIXI.Text(args.text, args.font);
    item.on('click', args.handler);
    item.on('tap', args.handler);
    let pos = this.nextItemPOS;
    if(args.align == 1){
      pos.x = Math.max((pos.x + this.itemWidth - item.width) / 2 + this.spacing, pos.x);
    }
    else if(args.align == 2){
      pos.x = Math.max((pos.x + this.itemWidth - item.width) , pos.x);
    }
    item.setPOS(pos.x, pos.y);
    this.addSelection(item)
    return item;
  }
  /**------------------------------------------------------------------------
   * Get the position where next selection item should be
   */
  get nextItemPOS(){
    return this.getIndexItemPOS(this._selections.length);
  }
  /**------------------------------------------------------------------------
   * Get index of current selected item
   */
  get index(){return this._index;}
  /**------------------------------------------------------------------------
   * Get index rect position
   */
  getIndexItemPOS(index){
    let divmod = (this.isVertical ? this.rowMax : this.colMax)
    let nx = (index % divmod) * (this.itemWidth + this.spacing) + this.spacing;
    let ny = (index / divmod) * (this.itemHeight + this.spacing) + this.spacing;
    nx += this.spacing; ny += this.spacing;
    return {x: nx, y:ny};
  }
  /*------------------------------------------------------------------------*/
  cursorRect(index){
    let rect = super.cursorRect(index);
    if(this.isVertical){
      rect.width  = (this.width / this.rowMax) - this.padding / 2;
    }
    else{
      rect.height = (this.height / this.colMax) - this.padding / 2;
    }
    return rect;
  }
  /*------------------------------------------------------------------------*/
  get isWindow(){return true;}
  /*------------------------------------------------------------------------*/
}
/**
 * Menu window in title screen
 * @class
 * @extends Window_Selectable
 */
class Window_Menu extends Window_Selectable{
  /**-------------------------------------------------------------------------
   * @constructor
   */
  constructor(x, y, w, h){
    super(x, y, w, h);
    this.changeSkin(Graphics.WSkinCelestia)
    this.addAllSelections();
  }
  /*------------------------------------------------------------------------*/
  addAllSelections(){
    this.addStartGame();
    this.addRules();
    this.addOptions();
    this.addCredits();
  }
  /*------------------------------------------------------------------------*/
  addStartGame(){
    let opt = {
      text: Vocab.StartGame,
      handler: this.onGameStart.bind(this),
      align: 1,
    }
    this.addTextSelection(opt);
  }
  /*------------------------------------------------------------------------*/
  addRules(){
    let opt = {
      text: Vocab.Rules,
      handler: this.onRules.bind(this),
      align: 1,
    }
    this.addTextSelection(opt);
  }
  /*------------------------------------------------------------------------*/
  addOptions(){
    let opt = {
      text: Vocab.Options,
      handler: this.onOption.bind(this),
      align: 1,
    }
    this.addTextSelection(opt);
  }
  /*------------------------------------------------------------------------*/
  addCredits(){
    let opt = {
      text: Vocab.Credits,
      handler: this.onCredits.bind(this),
      align: 1,
    }
    this.addTextSelection(opt);
  }
  /*------------------------------------------------------------------------*/
  onGameStart(){
    
  }
  /*------------------------------------------------------------------------*/
  onRules(){
    let b = window.confirm(Vocab["RulesRedirect"]);
    if(b){window.open(Vocab["RulesLink"], "_blank")}
  }
  /*------------------------------------------------------------------------*/
  onOption(){
    Sound.playOK();
    SceneManager.scene.raiseOverlay(Graphics.optionWindow);
  }
  /*------------------------------------------------------------------------*/
  onCredits(){
    let b = window.confirm(Vocab["CreditsRedirect"]);
    if(b){window.open(Vocab["CreditsLink"], "_blank")}
  }
  /*------------------------------------------------------------------------*/
}
/**
 * Option window 
 * @class
 * @extends Window_Selectable
 */
class Window_Option extends Window_Selectable{
  /**-------------------------------------------------------------------------
   * @constructor
   */
  constructor(){
    super();
    this.resize(this.WindowWidth, this.WindowHeight);
    this.setPOS(Graphics.appCenterWidth(this.width), Graphics.appCenterHeight(this.height));
    this.drawTitle();
    this.addClose();
    this.addOptions();
  }
  /*------------------------------------------------------------------------*/
  get WindowWidth(){return 500;}
  get WindowHeight(){return 400;}
  /*------------------------------------------------------------------------*/
  addClose(){
    let dx = this.width - this.padding - Graphics.IconRect.width;
    let dy = 0;
    this.closeIcon = this.drawIcon(Graphics.IconID.Xmark, dx, dy);
    let handler = function(){
      Sound.playCancel();
      SceneManager.scene.closeOverlay();
    }
    this.closeIcon.on('click', handler);
    this.closeIcon.on('tap', handler);
    this.addSelection(null);
  }
  /*------------------------------------------------------------------------*/
  drawTitle(){
    let txt = this.drawText(0, this.spacing, Vocab["Options"]);
    txt.x = (this.width - txt.width) / 2;
  }
  /*------------------------------------------------------------------------*/
  addOptions(){
    this.addMasterVolume();
    this.addBGMVolume();
    this.addSEVolume();
  }
  /**------------------------------------------------------------------------
   * Draggable meter to adjust master volume
   */
  addMasterVolume(){
    let pos = this.nextItemPOS;
    let sp  = new SpriteCanvas(0, 0, this.itemWidth, this.itemHeight);
    sp.drawText(0, 0, Vocab["MasterVolume"]);
    sp.setPOS(pos.x, pos.y);

    let offset = this.spacing / 2;
    let ts  = this.drawText(410, -offset, parseInt(Sound._masterVolume * 100));
    sp.addChild(ts);
    this.MVBar = new Sprite_DragBar(150, -offset, 250, null, null, null, parseInt(Sound._masterVolume * 100));
    sp.addChild(this.MVBar);
    this.MVBar.handler = function(v){
      Sound.changeMasterVolume(v / 100.0);
      ts.text = parseInt(Sound._masterVolume * 100);
    }
    this.addSelection(sp);
  }
  /*------------------------------------------------------------------------*/
  addBGMVolume(){
    let pos = this.nextItemPOS;
    let sp  = new SpriteCanvas(0, 0, this.itemWidth, this.itemHeight);
    sp.drawText(0, 0, Vocab["BGMVolume"]);
    sp.setPOS(pos.x, pos.y);
    let offset = this.spacing / 2;
    let ts  = this.drawText(410, -offset, parseInt(Sound._bgmVolume * 100));
    sp.addChild(ts);
    this.BVBar = new Sprite_DragBar(150, -offset, 250, null, null, null, parseInt(Sound._bgmVolume * 100));
    sp.addChild(this.BVBar);
    this.BVBar.handler = function(v){
      Sound.changeBGMVolume(v / 100.0);
      ts.text = parseInt(Sound._bgmVolume * 100);
    }
    this.BVBar.changeColor(Graphics.color.Violet)
    this.addSelection(sp);
  }
  /*------------------------------------------------------------------------*/
  addSEVolume(){
    let pos = this.nextItemPOS;
    let sp  = new SpriteCanvas(0, 0, this.itemWidth, this.itemHeight);
    sp.drawText(0, 0, Vocab["SEVolume"]);
    sp.setPOS(pos.x, pos.y);
    let offset = this.spacing / 2;
    let ts  = this.drawText(410, -offset, parseInt(Sound._seVolume * 100));
    sp.addChild(ts);
    this.SVBar = new Sprite_DragBar(150, -offset, 250, null, null, null, parseInt(Sound._seVolume * 100));
    sp.addChild(this.SVBar);
    this.SVBar.handler = function(v){
      Sound.changeSEVolume(v / 100.0);
      ts.text = parseInt(Sound._seVolume * 100);
    }
    this.SVBar.changeColor(Graphics.color.Orange)
    this.addSelection(sp);
  }
  /*------------------------------------------------------------------------*/
  activate(){
    super.activate();
    this.MVBar.activate();
  }
  /*------------------------------------------------------------------------*/
  deactivate(){
    super.deactivate();
    this.MVBar.deactivate();
  }
  /*------------------------------------------------------------------------*/
}

/**
 * Window that displays help message
 */
class Window_Help extends Window_Base{
  /*------------------------------------------------------------------------*/
  constructor(x, y, w, h){
    super(x, y, w, h);
    this.message = ''
  }
  /*------------------------------------------------------------------------*/
  setText(...args){
    this.clear();
    let dy = 0;
    for(let i=0;i<args.length;++i){
      dy += this.drawText(0, dy, args[i], null, true).height;
    }
  }
  /*------------------------------------------------------------------------*/
}

/**
 *  Window for selecting game mode 
 */
class Window_GameModeSelect extends Window_Selectable{
    /*------------------------------------------------------------------------*/
    constructor(x, y, w, h){
      super(x, y, w, h);
      this.changeSkin(Graphics.WSkinLuna)
      this.createSelections();
    }
    /*------------------------------------------------------------------------*/
    createSelections(){

    }
    /*------------------------------------------------------------------------*/
    addTraditionalSelection(){

    }
    /*------------------------------------------------------------------------*/
    addBattlePunoSelection(){

    }
    /*------------------------------------------------------------------------*/
    addDeathMatchSelection(){

    }
    /*------------------------------------------------------------------------*/
}

/**
 *  Window for custom in-game options
 */
class Window_GameOption extends Window_Selectable{
  /*------------------------------------------------------------------------*/
  constructor(x, y, w, h){
    super(x, y, w, h);
    this.changeSkin(Graphics.WSkinRarity)
    this.createOptions();
  }
  /**------------------------------------------------------------------------
   * Create all available options
   */
  createOptions(){

  }
  /**------------------------------------------------------------------------
   * Option defines how many cards player have at beginning, default is 7
   */
  addHandCardOption(){

  }
  /**------------------------------------------------------------------------
   * Whether enable extra cards(trade/wild chaos/discard all/wild hit),
   * default is enabled
   */
  addExtraCardOption(){

  }
  /**------------------------------------------------------------------------
   * Max HP at beginning in Battle Puno and Death Match, default is 200
   */
  addHPOption(){

  }
  /**------------------------------------------------------------------------
   * Score thereshold to end the game in battle puno, default is 500
   */
  addScoreGoalOption(){

  }
  /*------------------------------------------------------------------------*/
}