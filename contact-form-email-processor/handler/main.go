package main

import (
	"errors"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"
	"handler/form"
)

// There is some hard coded information in the forms package.
// The cost of implementing the get environment os is not worth it because it is unlikely
// The value will ever change. In fact......no one may ever read this very comment.......my god....I feel alone.

const awsRegion = "us-east-1"

func validRequest(r events.APIGatewayProxyRequest) error {

	if r.HTTPMethod != "POST" {
		return errors.New("http method not permitted")
	}

	if r.Body == "" {
		return errors.New("empty body not permitted")
	}

	//todo: should include a check of the cors origin

	return nil
}

func SendEmailUsingSES(form contactform.Submission) error {
	sess, err := session.NewSession(&aws.Config{

		//todo: currently hard coded, maybe this should be moved
		Region: aws.String(awsRegion)},
	)
	if err != nil {
		return err
	}

	svc := ses.New(sess)

	//I can drop the response return ( _, ) because if there is no error than the email has been sent
	_, err = svc.SendEmail(form.GenerateSESEmail())

	if err != nil {
		return err
	}

	return nil
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	err := validRequest(request)
	if err != nil {
		return contactform.ErrorResponse(err), nil
	}

	form, err := contactform.ConvertBodyToFormStruct(request.Body)
	if err != nil {
		return contactform.ErrorResponse(err), nil
	}

	err = SendEmailUsingSES(form)
	if err != nil {
		return contactform.ErrorResponse(err), nil
	}

	return contactform.SuccessResponse(), nil
}

func main() {
	lambda.Start(handler)
}
