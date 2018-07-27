1. 找出所有用户自定义的industry分类
db.resources.distinct("industry.name")
db.resources.distinct("skill.subname")
db.resources.find({ industry: { $exists: true, $eq: []  } })


旧版分类:
银行 Banking
保险 Insurance
证券 Financial Markets
智慧城市
整车制造 Automotive
零售 Retail
互联网 Media & Entertainment
工业4.0
航空 Aerospace & Defense
物流 Travel & Transportation
电信 Telecommunications
差旅报销 Travel & Transportation
电力 Energy & Utility
教育 Education
新能源 Energy & Utility
金融市场 Financial Markets
T&T Travel & Transportation

新分类
Aerospace & Defense 国防航空
Automotive 汽车
Chemicals & Petroleum 石油化工
Electronics 电子
Industrial Products 工业产品
Consumer Product 消费品
Retail 零售
Travel & Transportation 旅游运输
Banking 银行
Financial Markets 金融市场
Insurance 保险
Education 教育
Government 政府
Healthcare 医疗
Life Science 生命科学
Energy & Utility 能源和公用事业
Media & Entertainment 媒体娱乐
Telecommunications 电信



找出所有industry.name=银行的记录
db.resources.find({ 'industry.name':'银行'})
db.resources.update({ 'industry.name':'银行'}, { '$set': { 'industry.$.name': 'Banking' }}, {multi:true});
db.resources.update({ 'industry.name':'保险'}, { '$set': { 'industry.$.name': 'Insurance' }}, {multi:true});
db.resources.update({ 'industry.name':'证券'}, { '$set': { 'industry.$.name': 'Financial Markets' }}, {multi:true});
db.resources.update({ 'industry.name':'整车制造'}, { '$set': { 'industry.$.name': 'Automotive' }}, {multi:true});
db.resources.update({ 'industry.name':'零售'}, { '$set': { 'industry.$.name': 'Retail' }}, {multi:true});
db.resources.update({ 'industry.name':'互联网'}, { '$set': { 'industry.$.name': 'Media & Entertainment' }}, {multi:true});
db.resources.update({ 'industry.name':'Automotive and Aerospace & Defense'}, { '$set': { 'industry.$.name': 'Aerospace & Defense' }}, {multi:true});
db.resources.update({ 'industry.name':'物流'}, { '$set': { 'industry.$.name': 'Travel & Transportation' }}, {multi:true});
db.resources.update({ 'industry.name':'电信'}, { '$set': { 'industry.$.name': 'Telecommunications' }}, {multi:true});
db.resources.update({ 'industry.name':'差旅报销'}, { '$set': { 'industry.$.name': 'Travel & Transportation' }}, {multi:true});
db.resources.update({ 'industry.name':'电力'}, { '$set': { 'industry.$.name': 'Energy & Utility' }}, {multi:true});
db.resources.update({ 'industry.name':'教育'}, { '$set': { 'industry.$.name': 'Education' }}, {multi:true});
db.resources.update({ 'industry.name':'Energy & Utilities'}, { '$set': { 'industry.$.name': 'Energy & Utility' }}, {multi:true});
db.resources.update({ 'industry.name':'金融市场'}, { '$set': { 'industry.$.name': 'Financial Markets' }}, {multi:true});
db.resources.update({ 'industry.name':'T&T'}, { '$set': { 'industry.$.name': 'Travel & Transportation' }}, {multi:true});

db.resources.update({ 'industry.name':'智慧城市'}, { '$set': { 'industry.$.name': '智慧城市' }}, {multi:true})
db.resources.update({ 'industry.name':'工业4.0'}, { '$set': { 'industry.$.name': '工业4.0' }}, {multi:true})


2. 统一各行业的人数
```js

var mapFunction1 = function() {
    for (var idx = 0; idx < this.industry.length; idx++) {
        var key = this.industry[idx].name;
        var value = 1;
        emit(key, value);
    }
};
var reduceFunction1 = function(name, values) {
    return Array.sum(values);
};
db.resources.mapReduce(
    mapFunction1,
    reduceFunction1,
    { out: "map_reduce_example" }
)

```