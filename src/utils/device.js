class LayoutCalc {

    static RatioWidth = 750
    static CalendarHeight = 820

    constructor({ showTitleContent, showControlBar }) {
        this.device = wx.getSystemInfoSync()
        this.calendarMaxRate = this.judgeScreen()
        this.showTitleContent = showTitleContent;
        this.showControlBar = showControlBar;

        this.calendarTitleHeight = this.calcTitleHeight()
        this.calendarMainHeight = this.calcMainHeight()
        this.calendarPanelHeight = this.calendarMainHeight - this.calendarTitleHeight

        this.calendarMaxHeight = this.calcMaxHeight()
        this.calendarMinHeight = this.calcMinHeight()
    }

    judgeScreen() {
        const rate = this.device.windowHeight / this.device.windowWidth
        const limit = this.device.windowHeight === this.device.screenHeight ? 1.8 : 1.65
        return rate > limit ? 0.8 : 0.9
    }

    calcTitleHeight() {
        return Math.floor(200 * this.device.windowWidth / LayoutCalc.RatioWidth)
    }

    calcMainHeight() {
        return Math.floor(LayoutCalc.CalendarHeight * this.device.windowWidth / LayoutCalc.RatioWidth)
    }

    calcMaxHeight() {
        return Math.floor(this.device.windowHeight * this.calendarMaxRate)
    }

    calcMinHeight() {
        return this.calendarPanelHeight / 5 + this.calendarTitleHeight
    }

    

    layout() {
        let mainHeight = 320;
        let titleHeight = 40;
        let panelHeight = 230;
        let minHeight = 144;

        if (!this.showTitleContent) {
            mainHeight -= 40;
            titleHeight = 0;
            minHeight -= 40;
        }

        if (!this.showControlBar) {
            mainHeight -= 25;
            minHeight -= 25;
        }

        return {
            mainHeight,
            titleHeight,
            panelHeight,
            maxHeight: mainHeight,
            minHeight
        }
    }

}

module.exports = LayoutCalc