package contactform

import (
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/ses"
	"html"
	"net/mail"
)

//			"Content-Type":                 "application/json",
//			"Access-Control-Allow-Origin":  "*",
//			"Access-Control-Allow-Headers": "Content-Type",
//			"Access-Control-Allow-Methods": "OPTIONS,POST",

const InfoAddress = "okaytkokay@gmail.com"

type Submission struct {
	Email   string `json:"email"`
	Name    string `json:"name"`
	Details string `json:"details"`
}

func (f Submission) Address() string {
	return fmt.Sprintf("%s <%s>", f.Name, f.Email)
}

func (f Submission) GenerateSESEmail() *ses.SendEmailInput {

	emailBody := fmt.Sprintf("Name: \n%s\n\nEmail: \n%s\n\nDetails: \n%s\n", f.Name, f.Email, f.Details)

	//todo: this is a little hard to read; consider fixing it up
	msg := &ses.SendEmailInput{
		Message: &ses.Message{
			Body: &ses.Body{
				Text: &ses.Content{
					Data: aws.String(emailBody),
				},
			},
			Subject: &ses.Content{
				Data: aws.String("Website Contact Submission Submission"),
			},
		},
		Destination: &ses.Destination{
			ToAddresses: []*string{aws.String(InfoAddress)},
		},
		Source: aws.String("contact-form@okaytk.com"),
	}
	return msg
}

func ConvertBodyToFormStruct(body string) (Submission, error) {
	var form Submission

	err := json.Unmarshal([]byte(body), &form)
	if err != nil {
		return Submission{}, err
	}

	if !validEmail(form.Address()) {
		return Submission{}, fmt.Errorf("invalid email address")
	}

	form.Details = html.EscapeString(form.Details)

	return form, nil
}

func validEmail(address string) bool {
	_, err := mail.ParseAddress(address)
	if err != nil {
		return false
	}
	return true
}

func ErrorResponse(err error) events.APIGatewayProxyResponse {
	fmt.Printf("error: %v\n", err)

	c := fmt.Sprintf("{\"error\": \"%v\"}", err)
	return responseMessage(c)
}

func SuccessResponse() events.APIGatewayProxyResponse {
	c := fmt.Sprintf("{\"submitted\": \"success\"}")
	return responseMessage(c)
}

func responseMessage(content string) events.APIGatewayProxyResponse {
	return events.APIGatewayProxyResponse{
		Body: content,
		Headers: map[string]string{
			"Content-Type":                 "application/json",
			"Access-Control-Allow-Origin":  "*",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Allow-Methods": "OPTIONS,POST",
		},
		StatusCode: 200,
	}
}
