jQuery(document).ready(function() {
	if ($('form.feedback-form').length) {
	  formBuilder.sendForm({
			mailTo: $('input[name=MailTo]').val(), //<input name='MailTo' type='hidden' value='me@me.me' />
			mailSubject: $('input[name=MailSubject]').val(), //<input name='MailSubject' type='hidden' value="my subject" />
			formName: ".feedback-form",
			formContent: ".feedback-form .ContentItem",
			replyTo: "customer-email", //<input name='customer-email' type='email' />
			redirectOnSuccess: '', // can be an url to redirect page
			errorMessage: "<p><b>Beim Versenden des Formulars ist leider ein Fehler aufgetreten!</b></p><p>Bitte senden Sie eine E-Mail an <a href='mailto:support@seven49.net'>isupport@seven49.net</a> - danke bestens!</p>",
      loader: "<div class='loader-wrapper'><p>Bitte warten. Ihr Formular wird gerade übermittelt. Wenn Sie Dateien angehängt haben, kann dieser Vorgang einige Minuten in Anspruch nehmen. Schliessen Sie dieses Fenster und den Browser nicht.</p><img class='send-form' src='http://cdn.seven49.net/common/images/loading/ajax-loader-2.gif' /></div>",
			alternateSuccessMessage:  "Ihre Mitteilung wurde erfolgreich versendet!"
	  });
	}
});
