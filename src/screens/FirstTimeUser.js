

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Header, Content, Form, Item, Input, Label, Picker, Button, Text } from 'native-base';
import database from '@react-native-firebase/database';
import DocumentPicker from 'react-native-document-picker';




class FloatingLabelExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "selectgrade",
            name: "",
            age: "",
            address: "",
            contact: "",
            universityname: "",
            current_user: "",
            cv: "",
            companyname: "",
            email: "",
            jobposition: ""
        };
    }

    onValueChange = (value: string) => {
        this.setState({
            selected: value
        });
    }


    componentDidMount() {
        this.setState({ current_user: this.props.current_user, name: this.props.current_user.name })
    }

    openpicker = () => {
        const res = DocumentPicker.pick({ type: [DocumentPicker.types.allFiles] })
            .then(data => {
               
                this.setState({ cv: data })
            })
            .catch(err => {
                if (DocumentPicker.isCancel(err)) {
                    console.log("User cancelled the picker")
                    // User cancelled the picker, exit any dialogs or menus and move on
                } else {
                    throw err;
                }
            })
    }

    studentpersonaldata = () => {
        let createuser = {
            name: this.state.name,
            email: this.state.current_user.email,
            profile: this.state.current_user.profile,
            uid: this.state.current_user.uid,
            age: this.state.age,
            grade: this.state.selected,
            address: this.state.address,
            contact: this.state.contact,
            universityname: this.state.universityname,
            cv: this.state.cv
        }


        database().ref("/").child(`studentpersonalinformation/${this.state.current_user.uid}`).set(createuser).then(() => {
            this.props.navigation.replace("Home", "student")
            alert("Data Update Successful")

        }).catch(function (error) {
            // Handle Errors here.
            console.log(error)
        });

    }
    companypersonaldata = () => {
        let createuser = {
            name: this.state.name,
            companyname: this.state.companyname,
            email: this.state.email,
            jobposition: this.state.jobposition,
            profile: this.state.current_user.profile,
            uid: this.state.current_user.uid,
            address: this.state.address,
            contact: this.state.contact,
        }

        database().ref("/").child(`companypersonalinformation/${this.state.current_user.uid}`).set(createuser).then(() => {
            this.props.navigation.replace("Home", "company")
            alert("Data Update Successful")

        }).catch(function (error) {
            // Handle Errors here.
            console.log(error)
        });
    }



    render() {
        return (
            <Container>
                <Header />
                <Content>
                    {this.props.route.params === 'student' ? <Form>
                        <Item floatingLabel>
                            <Label>Name</Label>
                            <Input
                                onChangeText={text => this.setState({ name: text })}
                                value={this.state.name}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Age</Label>
                            <Input
                                onChangeText={text => this.setState({ age: text })}
                                value={this.state.age}
                            />

                        </Item>
                        <Item floatingLabel>
                            <Label>Contact Number</Label>
                            <Input
                                onChangeText={text => this.setState({ contact: text })}
                                value={this.state.contact}
                            />
                        </Item>

                        <Label style={{ margin: 18 }}>Grade</Label>
                        {/* <Item> */}
                        <Picker style={{ margin: 12 }}
                            note
                            mode="dropdown"
                            // style={{ width: 120 }}
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                        >
                            <Picker.Item label="Select Grade" value="selectgrade" />
                            <Picker.Item label="A+" value="A+" />
                            <Picker.Item label="A" value="A" />
                            <Picker.Item label="B" value="B" />
                            <Picker.Item label="C" value="C" />
                        </Picker>

                        <Item floatingLabel last>
                            <Label>Address</Label>
                            <Input
                                onChangeText={text => this.setState({ address: text })}
                                value={this.state.address}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>University Name</Label>
                            <Input
                                onChangeText={text => this.setState({ universityname: text })}
                                value={this.state.universityname}
                            />
                        </Item>
                        <Label style={{ margin: 18 }}>Upload CV</Label>
                        <Button style={{ marginLeft: 12 }} onPress={() => this.openpicker()}><Text>Open Picker</Text></Button>


                        <Button onPress={() => this.studentpersonaldata()} disabled={this.state.cv !== "" && this.state.name !== "" && this.state.age !== "" && this.state.address !== "" && this.state.universityname !== "" && this.state.contact !== "" && this.state.selected !== "selectgrade"
                            ? false : true} style={{ marginTop: 30 }} block>
                            <Text>Proceed</Text>
                        </Button>
                    </Form> :

                        <Form>
                            <Item floatingLabel>
                                <Label>Company Representative Name</Label>
                                <Input
                                    onChangeText={text => this.setState({ name: text })}
                                    value={this.state.name}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Company Name</Label>
                                <Input
                                    onChangeText={text => this.setState({ companyname: text })}
                                    value={this.state.companyname}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Company Email</Label>
                                <Input
                                    onChangeText={text => this.setState({ email: text })}
                                    value={this.state.email}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Job Position</Label>
                                <Input
                                    onChangeText={text => this.setState({ jobposition: text })}
                                    value={this.state.jobposition}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Company Contact Number</Label>
                                <Input
                                    onChangeText={text => this.setState({ contact: text })}
                                    value={this.state.contact}
                                />
                            </Item>
                            <Item floatingLabel last>
                                <Label>Company Address</Label>
                                <Input
                                    onChangeText={text => this.setState({ address: text })}
                                    value={this.state.address}
                                />
                            </Item>

                            <Button onPress={() => this.companypersonaldata()} disabled={this.state.name !== "" && this.state.companyname !== "" && this.state.address !== "" && this.state.contact !== "" && this.state.email !== ""
                                ? false : true} style={{ marginTop: 30 }} block>
                                <Text>Proceed</Text>
                            </Button>
                        </Form>}



                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    current_user: state.current_user
})

const mapDispatchToProps = (dispatch) => ({
    get_users: () => dispatch(get_users()),

    //parameter mei dena lazmi hai warna undefined 
    set_current_user: (create_user) => dispatch(set_current_user(create_user))
})


export default connect(mapStateToProps, mapDispatchToProps)(FloatingLabelExample)


