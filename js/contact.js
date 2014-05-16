;(function($, undefined){

  var MANDRILL_API_KEY = '1XsNull0JBVL_x_KmqkEsg',
      RECIPIENT = {
        name: 'Voxer',
        email: 'info@voxer.com'
      };

  $(function(){
    new EmailForm($('#contact-form'));
  });

  var EmailForm = function(form){
    this.$form = $(form);
    this.$submit = this.$form.find("[type='submit']");
    this.$name = this.$form.find("[name='name']");
    this.$email = this.$form.find("[name='email']");
    this.$company = this.$form.find("[name='company']");
    this.$message = this.$form.find("[name='message']");
    this.$spinner = this.$form.find(".ajax-loader");
    this.$successMsg = this.$form.find(".success-message");
    this.$errorMsg = this.$form.find(".error-message");

    this.$form.on('submit', function(e){
      e.preventDefault();
      this.$submit.prop("disabled", true);
      this.sendEmail();
    }.bind(this));

  };

  EmailForm.prototype.sendEmail = function(){
    this.$spinner.show();
    $.ajax({
      type: "POST",
      url: "https://mandrillapp.com/api/1.0/messages/send.json",
      data: {
        key: MANDRILL_API_KEY,
        message: {
          from_email: this.$email.val(),
          to: [{
                email: RECIPIENT.email,
                name: RECIPIENT.name,
                type: 'to'
              }
            ],
          autotext: true,
          subject: "Message from " + this.$name.val(),
          html: "company: " + this.$company.val() + "\n message: " + this.$message.val(),
        }
      },
      success: function(){
        this.$form[0].reset();
        this.$successMsg.show();
      }.bind(this),
      error: function(){
        this.$errorMsg.show();
      }.bind(this)
    }).always(function(response) {
      this.$spinner.hide();
      this.$submit.prop("disabled", false);
    }.bind(this));
  };


})(jQuery);
