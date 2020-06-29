import apiUrl from '../Global.js'
Vue.use(apiUrl);
var vmuserList = new Vue({
    el: '#registerUpdate',
    data:{
        userId:'',
        userName:'',
        userPasswd:'',
        userNewPasswd:'',
        userNewPasswd1:'',
        loginMsg:''

    },
    created(){
        //�Զ�����indexs����
        //this.userInfo();
    },mounted(){
        //�Զ�����indexs����
        //this.VerifyLogin();//��¼��֤
        this.userInfo();
    },
    methods: {
        userInfo:function () {
            this.userId=sessionStorage.getItem('userId');
            this.userName=sessionStorage.getItem('userName');
        },
        registerUpdate:function(){
            let loading
            if(this.userId!==""&&this.userName!==""&&this.userEmail!==""&&this.userTel!==""){
                loading=layer.load(2, {
                    shade: false,
                    time: 60*1000
                });
                //console.log(user)
                axios.post(apiUrl.apiUrl+'/CurriculumDesign3_Back/Controller/.action',
                    {
                        userId:this.userId,
                        passwd:this.userPasswd,
                        newPasswd:this.userNewPasswd,
                    }, {
                        headers: {
                            TOKEN:sessionStorage.getItem('token') ||'',
                            //jurisdiction:sessionStorage.getItem('jurisdiction') ||''
                        },
                        'Content-Type':'application/json'  //���д��contentType�ᱨ��
                    })
                    .then(response => {
                        layer.close(loading);
                        layer.open({
                            title: '��ʾ',
                            content: response.data.msg,
                            /* yes: function(index, layero) {
                                 that.userId=response.data.userId
                                 that.password=''
                                 that.passwordReturn()
                                 layer.close(index);
                             },*/
                        });
                        console.log(response.data);
                    })
                    .catch(error => {
                        layer.close(loading);
                        layer.open({
                            title: 'ʧ��',
                            content:'����������ʧ��'
                        });
                    });
            }
        },
       


    }

});
/**
 *����֤
 */
var $ = layui.$;
layui.use('form', function(){
    var form = layui.form;
    form.verify({
        username: function(value, item){ //value������ֵ��item������DOM����
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s��]+$").test(value)){
                return '�û��������������ַ�';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '�û�����β���ܳ����»���\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
                return '�û�������ȫΪ����';
            }
        }

        //���Ǽ�֧����������ʽ�ķ�ʽ��Ҳ֧�������������ʽ
        //���������ֵ�ֱ����[����ƥ�䡢ƥ�䲻��ʱ����ʾ����]
        ,pass: [
            /^[\S]{6,12}$/
            ,'�������6��12λ���Ҳ��ܳ��ֿո�'
        ]

        ,confirmPass:function(value, item){
            if($('input[name=registerPasswd]').val() !== value){
                return '������������벻һ��'
            }
        },
        confirmPass1:function(value, item){
            if($('input[name=pwdPasswd]').val() !== value){
                return '������������벻һ��'
            }
        },
    });
});

