
<template>

    <div id="app">

        <!-- 上部 -->
        <div class="top">

            <div class="budget">

                <h2 class="budget__title">{{ computedYear }}年{{ computedMonth }}月の予算</h2>
                
                <div class="budget__value">￥ {{ calcRemaining }}</div>
                
                <div class="budget__income clearfix">
                    <div class="budget__income--text">収入</div>
                    <div class="right">
                        <div class="budget__income--value">{{ calcIncome }}</div>
                        <div class="budget__income--percentage">&nbsp;</div>
                    </div>
                </div>
                
                <div class="budget__expenses clearfix">
                    <div class="budget__expenses--text">支出</div>
                    <div class="right clearfix">
                        <div class="budget__expenses--value">- {{ calcExpense }}</div>
                        <div class="budget__expenses--percentage">{{ calcPercentage }}%</div>
                    </div>
                </div>
            </div>
            
        </div>
        
        
        <!-- 下部 -->
        <div class="bottom">
            
            <!-- 追加エリア -->
            <div class="add">
                <div class="add__container">
                    <select class="add__type" v-model="selectedOperator">
                        <option value="inc" selected>+</option>
                        <option value="exp">-</option>
                    </select>
                    <input type="text" class="add__description" placeholder="費目" ref="itemName">
                    <input type="number" class="add__value" placeholder="金額" ref="itemValue" v-on:keypress.enter="addListItem">
                    <button class="add__btn" v-on:click="addListItem"><font-awesome-icon icon="check-circle"></font-awesome-icon></button>
                </div> 
            </div>
            
            
            <div class="container clearfix">

                <!-- 収入エリア -->
                <div class="income">
                    <h2 class="icome__title"><font-awesome-icon icon="money-bill-wave-alt"></font-awesome-icon>収入</h2>
                    
                    <div class="income__list">
                    
                        
                        <div class="item clearfix" v-for="item in income" v-bind:key="item.name">
                            <div class="item__description">{{ item.name }}</div>
                            <div class="right clearfix">
                                <div class="item__value">{{ item.value }}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn" v-on:click="removeIncomeList(item)">
                                        <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                                    </button>
                                </div>
                            </div>
                        </div>   


                    </div>
                </div>
                
                
                <!-- 支出エリア -->
                <div class="expenses">
                    <h2 class="expenses__title"><font-awesome-icon icon="yen-sign"></font-awesome-icon>支出</h2>
                    
                    <div class="expenses__list">
                    
                        
                        <div class="item clearfix" v-for="item in expense" v-bind:key="item.name">
                            <button class="shopping__add--btn" v-on:click="addShoppingItem(item)">
                                <font-awesome-icon icon="shopping-basket"></font-awesome-icon>
                            </button>

                            <div class="item__description">{{ item.name }}</div>
                            <div class="right clearfix">
                                <div class="item__value">-{{ item.value }}</div>
                                <div class="item__percentage">{{ calcItemPercentage(item) }}%</div>

                                <div class="item__delete">
                                    <button class="item__delete--btn" v-on:click="removeExpenseList(item)">
                                        <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>


                <!-- 買い物リスト -->
                <div class="shopping">
                    <h2 class="shopping__title"><font-awesome-icon icon="shopping-cart"></font-awesome-icon>買い物リスト</h2>
                    
                        <div class="shopping__list" v-for=" (item, i) in shopping" v-bind:key="i">
                                                        
                            <input type="checkbox" 
                                    class="shopping__checkbox" 
                                    v-bind:id="'item' + i" 
                                    v-bind:value="item" 
                                    v-modle="isCheckedItems">
                            <label v-bind:for="'item' + i" class="shopping__checkbox--label">{{ item }}</label>

                        <div class="right">
                            <button class="item__delete--btn" v-on:click="removeShoppingList(item)">
                                <font-awesome-icon icon="trash-alt"></font-awesome-icon>
                            </button>
                        </div>

                    </div>

                </div>

            </div>
            
        </div>
        
        <footer>&copy; MIKI ISHIBASHI</footer>

    </div>

</template>

<script>

export default {
   
    name: 'app',
    data() {
        return {
            //---------------
            // TOP
            //---------------
            year: 2000, // 年の表示
            month: 9, // 月の表示
            selectedOperator: 'inc', 

            //---------------
            // GENERAL
            //---------------
            income: [], // 収入の情報を格納する配列
            expense: [], // 支出の情報を格納する配列
            shopping: [], // 買い物リストの情報を格納する配列
            isCheckedItems: [] // 買い物リストのチェックボックスを各々管理するための配列
        }
    },

    computed: {
        //---------------
        // 現在の年を算出
        //---------------
        computedYear: function() {
            const date = new Date()
            const year = date.getFullYear()
            return this.year = year
        },

        //---------------
        // 現在の月を算出
        //---------------
        computedMonth: function() {
            const date = new Date()
            const month = date.getMonth()
            return this.month = month + 1
        },

        //---------------
        // 収入の合計を算出
        //---------------
        calcIncome: function() {
            return this.income.reduce(function(prev, cur) {
                // コンマを空欄に置き換える(cur:今の値)
                const curComma = (cur.value).replace(/,/g, "")
                // 文字列から数値になおす
                const curNum = parseInt(curComma)

                if(prev === 0) { 
                    // 収入を全部足して、カンマを付ける
                    return (prev + curNum).toLocaleString()
                } else { 
                    // コンマを空欄に置き換える(prev:前の値)
                    const prevNum = parseInt(prev.replace(/,/g, ""))
                    // 収入を全部足して、カンマを付ける
                    return (prevNum + curNum).toLocaleString()
                }
            }, 0)
        },

        //---------------
        // 支出の合計を算出
        //---------------
        calcExpense: function() {
            return this.expense.reduce(function(prev, cur) {
                // コンマを空欄に置き換える(cur:今の値)
                const curComma = (cur.value).replace(/,/g, "")
                // 文字列から数値になおす
                const curNum = parseInt(curComma)

                if(prev === 0) {
                    // 支出を全部足して、カンマを付ける
                    return (prev + curNum).toLocaleString()
                } else {
                    // コンマを空欄に置き換える(prev:前の値)
                    const prevNum = parseInt(prev.replace(/,/g, ""))
                    // 支出を全部足して、カンマを付ける
                    return (prevNum + curNum).toLocaleString()
                }
            }, 0)
        },

        //----------------------------
        // 残りの金額（収入-支出）を算出
        //----------------------------
        calcRemaining: function() {
            // 収入も支出も0のとき
            if(this.calcIncome === 0 && this.calcExpense === 0) {
                return

            // 収入が0のとき
            } else if(this.calcIncome === 0) {
                // 支出のみコンマを空欄に置き換えて、数値に戻す
                const calcExpNum = parseInt((this.calcExpense).replace(/,/g, ""))
                // 収入-支出 → コンマを付け直す
                return (this.calcIncome - calcExpNum).toLocaleString()
            
            // 支出が0のとき
            } else if(this.calcExpense === 0) {
                // 収入のみコンマを空欄に置き換えて、数値に戻す
                const calcIncNum = parseInt((this.calcIncome).replace(/,/g, ""))
                // 収入-支出 → コンマを付け直す
                return (calcIncNum - this.calcExpense).toLocaleString()
            
            // 収入も支出共に0以上のとき
            } else {
                // 収入、支出共にコンマを空欄に置き換えて、数値に戻す
                const calcIncNum = parseInt((this.calcIncome).replace(/,/g, ""))
                const calcExpNum = parseInt((this.calcExpense).replace(/,/g, ""))
                // 収入-支出 → コンマを付け直す
                return (calcIncNum - calcExpNum).toLocaleString()
            }
        },

        //----------------------------
        // 収入に対する支出の割合(%)を算出
        //----------------------------
        calcPercentage: function() {
            // 収入も支出も0のとき
            if(this.calcIncome === 0 && this.calcExpense === 0) {
                return 0

            // 収入が0のとき
            } else if(this.calcIncome === 0) {
                // 支出のみコンマを空欄に置き換えて、数値に戻す
                const calcExpNum = parseInt((this.calcExpense).replace(/,/g, ""))
                // (支出 ÷ 収入) × 100 => 少数点以下四捨五入
                return Math.round((calcExpNum / this.calcIncome) * 100)
            
            // 支出が0のとき
            } else if(this.calcExpense === 0) {
                // 収入のみコンマを空欄に置き換えて、数値に戻す
                const calcIncNum = parseInt((this.calcIncome).replace(/,/g, ""))
                // (支出 ÷ 収入) × 100 => 少数点以下四捨五入
                return Math.round((this.calcExpense / calcIncNum) * 100)
            
            // 収入も支出共に0以上のとき
            } else {
                // 収入、支出共にコンマを空欄に置き換えて、数値に戻す
                const calcIncNum = parseInt((this.calcIncome).replace(/,/g, ""))
                const calcExpNum = parseInt((this.calcExpense).replace(/,/g, ""))
                // (支出 ÷ 収入) × 100 => 少数点以下四捨五入
                return Math.round((calcExpNum / calcIncNum) * 100)
            }
        }

    },

    methods: {
        //----------------------------
        // リスト追加関数
        //----------------------------
        addListItem: function() {
            // inputに入力された内容を参照
            const itemName = this.$refs.itemName
            const itemValue = this.$refs.itemValue

            // inputに何も入力されない場合
            if(!itemName.value.length || !itemValue.value.length) {
                alert('費目と金額をご記入ください')
                return
            }

            // '+'マークが選択されたとき
            if(this.selectedOperator === 'inc') {
                // income arrayに {name:'費目', value:金額} をpush
                this.income.push({ 
                    name: itemName.value,
                    value: parseInt(itemValue.value).toLocaleString()
                })

            // '-'マークが選択されたとき
            } else if(this.selectedOperator === 'exp') {
                if((this.income).length === 0) {
                    alert('最初に収入を登録してください')
                } else {
                    // expese arrayに {name:'費目', value:金額} をpush
                    this.expense.push({ 
                        name: itemName.value,
                        value: parseInt(itemValue.value).toLocaleString()
                    }) 
                }
            } 
            
            // inputのリセット
            itemName.value = ''
            itemValue.value = ''
            return
        },

        //-----------------------------------
        // リストアイテム毎に支出の割合(%)を算出
        //-----------------------------------
        calcItemPercentage: function(item) {
            const calcIncNum = parseInt((this.calcIncome).replace(/,/g, "")) 
            const calcItemExp = parseInt((item.value).replace(/,/g, "")) 
            // （アイテム単体の支出 ÷ 収入総額） × 100 = 収入総額に対するアイテム１つの割合
            return Math.round((calcItemExp / calcIncNum) * 100) 
        },

        //----------------------------
        // 収入リスト削除関数
        //----------------------------
        removeIncomeList: function(item) {
            const index = this.income.indexOf(item)
            this.income.splice(index, 1)
        },

        //----------------------------
        // 支出リスト削除関数
        //----------------------------
        removeExpenseList: function(item) {
            const index = this.expense.indexOf(item)
            this.expense.splice(index, 1)
        },

        //----------------------------
        // 買い物リスト追加関数
        //----------------------------
        addShoppingItem: function(item) {
            this.shopping.push(item.name)
        },

        //----------------------------
        // 買い物リスト削除関数
        //----------------------------
        removeShoppingList: function(item) {
            const index = this.shopping.indexOf(item)
            this.shopping.splice(index, 1)
        },

    }

  }
</script>


<style>
/**********************************************
　General
**********************************************/

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    color: #555;
    font-family: 'M PLUS 1p', sans-serif;
    font-size: 16px;
    position: relative;
    height: 100vh;
    font-weight: 400;
}

svg {
    margin-right: 8px;
}

.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

.right { 
    float: right; 
}

font-awesome-icon {
    color: #555;
}

/**********************************************
　Top
**********************************************/

.top {
    height: 10rem;
    background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(../../static/back.jpg);
    background-size: cover;
    background-position: center;
    position: relative;
    padding: 7rem 0 10rem 0;
}

.budget {
    position: absolute;
    width: 650px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
}

.budget__title {
    text-align: center;
    margin-bottom: 10px;
    font-weight: 200;
}

.budget__value {
    font-weight: 300;
    font-size: 46px;
    text-align: center;
    margin-bottom: 25px;
    letter-spacing: 2px;
}

.budget__income,
.budget__expenses {
    padding: 12px;
    text-transform: uppercase;
    width: 300px;
    /* margin: 2em auto; 
    padding: 1em 1.5em; */
    color: #fff; 
    border-radius: 3em .8em 3em .7em/.9em 2em .8em 3em;
}

.budget__income {
    margin-bottom: 10px;
    float: left;
    border: 4px solid #bce7f6; 

}

.budget__expenses {
    float: right;
    border: 4px solid #f6bfbc; 
}

.budget__income--text,
.budget__expenses--text {
    float: left;
    font-size: 20px;
    color: #fff;
    margin-top: 2px;
}

.budget__income--value,
.budget__expenses--value {
    letter-spacing: 1px;
    float: left;
    font-size: 20px;
}

.budget__income--percentage,
.budget__expenses--percentage {
    float: left;
    width: 34px;
    font-size: 15px;
    padding: 3px 0;
    margin-left: 10px;
}

.budget__expenses--percentage {
    background-color: rgba(255, 255, 255, 0.2);
    text-align: center;
    border-radius: 3px;
}


/**********************************************
  Bottom
**********************************************/

/***** FORM *****/

.add {
    padding: 14px;
    border-bottom: 1px solid #e7e7e7;
    background-color: #f7f7f7;
}

.add__container {
    margin: 0 auto;
    text-align: center;
}

.add__type {
    width: 55px;
    border: 1px solid #e7e7e7;
    height: 44px;
    font-size: 18px;
    color: inherit;
    background-color: #fff;
    margin-right: 10px;
    font-weight: 300;
    transition: border 0.3s;
}

.add__description,
.add__value {
    border: 1px solid #e7e7e7;
    background-color: #fff;
    color: inherit;
    font-family: inherit;
    font-size: 14px;
    padding: 12px 15px;
    margin-right: 10px;
    border-radius: 5px;
    transition: border 0.3s;
}

.add__description { 
    width: 350px;
}

.add__value { 
    width: 150px;
}

.add__btn {
    font-size: 35px;
    background: none;
    border: none;
    color: #28B9B5;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    line-height: 1.1;
    margin-left: 10px;
}

.add__btn:active { 
    transform: translateY(2px); 
}

.add__type:focus,
.add__description:focus,
.add__value:focus {
    outline: none;
    border: 1px solid #28B9B5;
}

.add__btn:focus { 
    outline: none; 
}

/***** LISTS *****/
.container {
    width: 1200px;
    margin: 60px;
    float: left;
}

.income {
    float: left;
    width: 350px;
    margin-right: 60px;
}

.expenses {
    float: left;
    width: 350px;
    margin-right: 60px;
}

.shopping {
    float: left;
    width: 280px;
    padding: 8px;
    background-color: #f7f7f7;
    border-radius: 5px;
}

h2 {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 15px;
}

.icome__title { 
    color: #28B9B5; 
}

.expenses__title { 
    color: #FF5049; 
}

.shopping__title { 
    color: darkslategrey;
}

.item {
    padding: 13px;
    border-bottom: 1px solid #e7e7e7;
}

.item:first-child { 
    border-top: 1px solid #e7e7e7; 
}

.item:nth-child(even) { 
    background-color: #f7f7f7; 
}

.item__description {
    float: left;
}

.item__value {
    float: left;
    transition: transform 0.3s;
}

.item__percentage {
    float: left;
    margin-left: 20px;
    transition: transform 0.3s;
    font-size: 11px;
    background-color: #FFDAD9;
    padding: 3px;
    border-radius: 3px;
    width: 32px;
    text-align: center;
}

.income .item__value,
.income .item__delete--btn {
    color: #28B9B5;
}

.expenses .item__value,
.expenses .item__percentage,
.expenses .item__delete--btn {
    color: #FF5049;
}


.item__delete {
    float: left;
}

.item__delete--btn {
    font-size: 22px;
    background: none;
    border: none;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    display: none;
}

.item__delete--btn:focus,
.shopping__add--btn:focus {
    outline: none; 
}

.item__delete--btn:active,
.shopping__add--btn:active { 
    transform: translateY(2px); 
}

.item:hover .item__delete--btn { 
    display: block; 
}

.item:hover .item__value { 
    transform: translateX(-20px); 
}

.item:hover .item__percentage { 
    transform: translateX(-20px); 
}

.unpaid {
    background-color: #FFDAD9 !important;
    cursor: pointer;
    color: #FF5049;

}

.unpaid .item__percentage { 
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1); 
}

.unpaid:hover .item__description { 
    font-weight: 900; 
}

/**********************************************
  Shopping list
**********************************************/
/*** custom checkboxes ***/

.shopping__add--btn {
    font-size: 20px;
    background: none;
    border: none;
    cursor: pointer;
    line-height: 1;
    float: left;
    color: dimgray;
}

/* inactive default style */

.shopping__checkbox{ 
    -webkit-appearance:none; 
    -moz-appearance:none;
    appearance:none;
}

.shopping__checkbox--label {
    font-size:16px;
    display:inline-block;
    padding-left:25px;
    cursor:pointer;
    height:30px;
    line-height:30px;
    position:relative;
}

.shopping__checkbox--label:before{
    content:"";
    display:block;
    width:16px;
    height:16px;
    border:solid 1.5px #555;
    box-sizing:border-box;
    position:absolute;
    left:0;
    top:6px;
    transition:0.1s ease-in-out;
}

.shopping__checkbox:checked + .shopping__checkbox--label:before{
    transform:rotate(45deg);
    border-top:0;
    border-left:0;
    width:10px;
    left:5px;
    top:3px;
    border-color:#3cb371;
    text-decoration: line-through;
}

.shopping__title {
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 5px;
    text-align: center;
}

.shopping__list--container {
    list-style: none;
    clear: both;
}

.shopping__list:hover .item__delete--btn {
    display: inline-block;
}

.deleteLine {
    text-decoration: line-through;
}


/**********************************************
　Footer
**********************************************/

footer {
    color: gainsboro;
    text-align: center;
    font-size: 14px;
    clear: both;
}

</style>
