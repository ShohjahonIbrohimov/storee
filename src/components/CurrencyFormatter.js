function CurrencyFormatter(number){
    return new Intl.NumberFormat("ru-Ru").format(number)
}
export default CurrencyFormatter;