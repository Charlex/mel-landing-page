import re
import json
import mailchimp

def lambda_handler(event, context):
	""" 
	Handle incoming subscriptions
	"""
	email_address = event.get('email', None)

	if not email_address:
		return {
			"status": "error",
			"message": "No email provided"
		}

	mc_api = mailchimp.Mailchimp('7e0ea9d085aa3607346837bc1f5d02d5-us12')
	mc_list_id = "523ac2a663"

	response = {
		"status": None,
		"message": None
	}

	if re.match(
			r"(^[-!#$%&'*+/=?^_`{}|~0-9A-Z]+(\.[-!#$%&'*+/=?^_`{}|~0-9A-Z]+)*"r'|^"([\001-\010\013\014\016-\037!#-\[\]-\177]|\\[\001-011\013\014\016-\177])*"'r')@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?$', 
			email_address, 
			re.IGNORECASE
		):
		try:
			mc_api.lists.subscribe(
				mc_list_id, 
				{"email": email_address}, 
				double_optin=False
			)
			response["status"] = "success"
			response["message"] = "You're now signed up"
		except mailchimp.ListAlreadySubscribedError:
			response["status"] = "success"
			response["message"] = "You've signed up again"
		except:
			response["status"] = "error"
			response["message"] = "Your email address appears to be invalid"
	else:
			response["status"] = "error"
			response["message"] = "Your email address appears to be invalid"

	return response
