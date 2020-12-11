module.exports = {
    devServer: {
        proxy: {
            '/arxiv': 'https://script.google.com/macros/s/AKfycbwkY30DoRmckEogVP8QB-XxhTvtJleGM8w6HTHCMFxB4iwrmPMN/exec'
        }
    }
}