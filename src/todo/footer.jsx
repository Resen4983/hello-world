import '../assets/styles/footer.styl';
export default {
    data(){
        return{
            author: 'resen'
        }
    },
    render(){
        return(
            <div id="footer">
                <span>written by &trade;{this.author}</span>
            </div>
        )
    }
}