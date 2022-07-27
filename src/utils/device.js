class LayoutCalc {

    static RatioWidth = 750
    static CalendarHeight = 820

    constructor({ showTitleContent }) {
        this.device = wx.getSystemInfoSync()
        this.calendarMaxRate = this.judgeScreen()
        this.showTitleContent = showTitleContent;

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
        return {
            mainHeight: this.showTitleContent ? 320 : 280,
            titleHeight: this.showTitleContent ? 40 : 0,
            panelHeight: this.showTitleContent ? 230: 230,
            maxHeight: this.showTitleContent ? 320 : 280,
            minHeight: this.showTitleContent ? 144 : 104
        }
    }

}

module.exports = LayoutCalc