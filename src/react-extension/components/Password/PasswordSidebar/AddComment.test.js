/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */

import {commentsMock, defaultAppContext, defaultProps, tooLongComment} from "./AddComment.test.data";
import PasswordSidebarCommentSectionPage from "./PasswordSidebarCommentSection.test.page";



/**
 * Unit tests on AddComponent in regard of specifications
 */

beforeEach(() => {
    jest.resetModules();
});

describe("Add comments", () => {

    var page; // The page to test against
    const context = defaultAppContext(); // The applicative context
    const props = defaultProps(); // The props to pass


    // The mocked context port request
    const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);
    const noneCommentFoundRequestMockImpl = jest.fn(() => Promise.resolve([]));
    const commentsFoundRequestMockImpl = jest.fn(() => Promise.resolve(commentsMock));

    describe("Scenario: Start editing if there is no comment yet", () => {

        /**
         * Given I have selected a resource with no comments
         * When I open the “Comments” section of the secondary sidebar
         * Then I should be prompted to insert a new comment
         * And I should not see the add icon
         */

        beforeEach( () => {
            page = new PasswordSidebarCommentSectionPage(context, props);
            mockContextRequest(noneCommentFoundRequestMockImpl);
        })

        it("I should be prompted to insert a new comment", async () => {
            await page.title.click();

            expect(page.addComment.exists()).toBeTruthy();
            expect(context.port.request).toBeCalled();
        });


        it("I should not see the add icon", async () => {
            await page.title.click();

            expect(page.addIcon.exists()).toBeFalsy();
            expect(context.port.request).toBeCalled();
        });

    });


    describe("Scenario: Start adding a comment by clicking on the add icon", () => {

        /**
         * Given I selected a resource that has comments
         * And I opened the Comments section of the resource sidebar
         * When I click on the add icon
         * Then I should start adding a comment
         */


        beforeEach( () => {
            page = new PasswordSidebarCommentSectionPage(context, props);
            mockContextRequest(commentsFoundRequestMockImpl);
        })

        it("I should start adding a comment", async () => {
            await page.title.click();
            expect(page.addIcon.exists()).toBeTruthy();
            expect(page.addComment.exists()).toBeFalsy();
            expect(context.port.request).toBeCalled();

            await page.addIcon.click();
            expect(page.addIcon.exists()).toBeTruthy();
            expect(page.addComment.exists()).toBeTruthy();
        });


    });

    describe("Scenario: Stop adding a comment by clicking on the add icon", () => {

        /**
         * Given I am adding a comment to a resource that already has comments
         * When I click on the add icon
         * Then I should stop adding a comment
         */

        beforeEach( () => {
            page = new PasswordSidebarCommentSectionPage(context, props);
            mockContextRequest(commentsFoundRequestMockImpl);
        })

        it("I should stop adding a comment", async () => {
            await page.title.click();
            await page.addIcon.click();
            await page.addComment.write("I'm starting a new comment");
            await page.addIcon.click();
            expect(page.addComment.hasFocus()).toBeFalsy();
        });

    });

    describe("Scenario: Stop adding a comment by clicking out of the adding zone", () => {

        /**
         * Given I am adding a comment to a resource
         * When I click out of the adding zone
         * Then I should stop the adding operation
         */

        // Standard browser behavior (?)
    });

    describe("Scenario: Add a comment on top of the list", () => {



        /**
         * Given I am adding a comment to a resource
         * And I typed “Good men don’t need rules.”
         * When I submit the comment
         * Then I should see the comment “Good men don’t need rules.” at the top of the comments list
         */

        let requestMock;

        beforeEach( () => {
            page = new PasswordSidebarCommentSectionPage(context, props);
            requestMock = mockContextRequest(commentsFoundRequestMockImpl).mockClear();
        })

        it('I should see the comment “Good men don’t need rules.” at the top of the comments list', async () => {

            // Since there's a refresh fetch after adding a comment, just need to check if the refresh fetch call is done


            await page.title.click();
            await page.addIcon.click();
            await page.addComment.write("I'm writing a valid comment");
            await page.addComment.save();

            expect(context.port.request).toHaveBeenCalledTimes(3);

            const requestName = requestMock.mock.calls[2][0];
            expect(requestName).toBe("passbolt.comments.find-all-by-resource");
        })



    });

    describe("Scenario: Cancel a comment adding for a resource with several comments", () => {


        /**
         * Given a resource with several comments
         * And I started to type a new comment “I’m writing a new comment”
         * When I ask for the cancellation of the new comment
         * Then the new comment shouldn’t be added to the resource’s comments
         * And  the adding operation should be stopped
         */

        beforeEach( () => {
            page = new PasswordSidebarCommentSectionPage(context, props);
            mockContextRequest(commentsFoundRequestMockImpl);
        })

        it("the new comment shouldn’t be added to the resource’s comments", async () => {

            // TODO When the display comments part is done
        });

        it("the adding operation should be stopped", async () => {
            await page.title.click();
            await page.addIcon.click();
            await page.addComment.write("I’m writing a new comment");
            await page.addComment.cancel();

            expect(page.addComment.exists()).toBeFalsy();
        });


    });

    describe("Scenario: Cannot edit while submitting", () => {

        /**
         * Given I am adding a comment to a resource
         * And I am submitting the changes
         * When I try to interact with any components of the adding component
         * Then I should not be able to
         */

        let saveResolve;
        const saveMockImpl = jest.fn(() => new Promise(resolve => { saveResolve = resolve; }));
        const requestsMockImpl = async (...parameters) => {
            const requestName = parameters[0];
            switch(requestName) {
                case 'passbolt.comments.find-all-by-resource': return await commentsFoundRequestMockImpl(...parameters);
                case 'passbolt.comments.create': return await saveMockImpl(...parameters);
                default: return jest.fn(() => Promise.resolve([]));
            }
        }

        beforeEach( () => {
            page = new PasswordSidebarCommentSectionPage(context, props);
            mockContextRequest(requestsMockImpl).mockClear();
        })


        it("the adding operation should be stopped", async () => {
            await page.title.click();
            await page.addIcon.click();
            await page.addComment.write("I'm writing a valid comment");

            const inProgressFn = () => {
                expect(page.addComment.isDisabled()).toBeTruthy();
                saveResolve();
            }

            await page.addComment.save(inProgressFn);
            expect(page.addComment.isDisabled()).toBeFalsy();

        });

    });

    describe("Scenario: Show progress feedback while submitting", () => {


        /**
         * Given I am adding a comment to a resource
         * And I have typed “Good men don’t need rules.”
         * When I submit the change
         * Then I should see a progression feedback
         */

        beforeEach( () => {
            // TODO
        })

        it('I should be notified about the success of the operation',  () => {
            // TODO Depend on the progress feedback component
        })

    });

    describe("Scenario: See notification after adding a comment", () => {

        /**
         * Given I am adding a comment to a resource
         * And I have typed “Good men don’t need rules.”
         * When I submit the change
         * Then I should be notified about the success of the operation
         */

        beforeEach( () => {
            // TODO
        })

        it('I should be notified about the success of the operation',  () => {
            // TODO Depend on the notification component
        })

    });

    describe("Scenario: Cannot add a comment longer than 256 characters", () => {

        /**
         * Given I am adding a comment to a resource
         * When I’m typing the “The way I see it every life is a pile of good things and bad things. The good things don’t always soften the bad things but vice versa the bad things don’t always spoil the good things and make them unimportant. The good things don’t always soften the bad things but vice versa the bad things don’t always spoil the good things and make them unimportant.”
         * Then I should see a feedback message explaining to me that the comment is too long
         * And I should not able to add the comment
         */

        beforeEach( () => {
            page = new PasswordSidebarCommentSectionPage(context, props);
            mockContextRequest(commentsFoundRequestMockImpl).mockClear();
        })


        it('I should see a feedback message explaining to me that the comment is too long', async () => {
            await page.title.click();
            await page.addIcon.click();
            await page.addComment.write(tooLongComment);
            await page.addComment.save();

            expect(page.addComment.isTooLong).toBeTruthy();
        });

        it('I should not able to add the comment', async () => {
            await page.title.click();
            await page.addIcon.click();
            await page.addComment.write(tooLongComment);
            await page.addComment.save();

            expect(context.port.request).toHaveBeenCalledTimes(1);
        })

    });


    describe("Scenario: Cannot add an empty comment", () => {

        /**
         * Given a resource with several comments
         * When I type a string “” as a new comment
         * Then I shouldn’t be able to add the new comment
         * And I should not able to add the comment
         */

        beforeEach( () => {
            page = new PasswordSidebarCommentSectionPage(context, props);
            mockContextRequest(commentsFoundRequestMockImpl).mockClear();
        })


        it('I should see a feedback message explaining to me that the comment is required\n', async () => {
            await page.title.click();
            await page.addIcon.click();
            await page.addComment.write('');
            await page.addComment.save();

            expect(page.addComment.isEmpty).toBeTruthy();
        });

        it('I should not able to add the comment', async () => {
            await page.title.click();
            await page.addIcon.click();
            await page.addComment.write('');
            await page.addComment.save();

            expect(context.port.request).toHaveBeenCalledTimes(1);
        })

    });

    describe("Scenario: Trim a comment", () => {

        /**
         * Given I am adding a comment to a resource
         * And I typed space characters to start and end the comment
         * When I submit the comment
         * Then I should see not see spaces at the end or a the start of the added comment
         */

        let requestMock;

        beforeEach( () => {
            page = new PasswordSidebarCommentSectionPage(context, props);
            requestMock = mockContextRequest(commentsFoundRequestMockImpl).mockClear();
        })


        it('I should see not see spaces at the end or a the start of the added comment', async () => {
            await page.title.click();
            await page.addIcon.click();
            await page.addComment.write(' I am writing a comment ');
            await page.addComment.save();

            expect(context.port.request).toHaveBeenCalledTimes(3);

            const createCallPayload = requestMock.mock.calls[1][1];
            expect(createCallPayload.content).toBe("I am writing a comment");
        });



    });


    describe("Scenario: Cannot add an empty trimmed comment", () => {

        /**
         * Given a resource with several comments
         * When I type an string “   “ as comment
         * Then I shouldn’t be able to add the comment
         * And it should be displayed “A comment is required.”
         */

        beforeEach( () => {
            page = new PasswordSidebarCommentSectionPage(context, props);
            mockContextRequest(commentsFoundRequestMockImpl).mockClear();
        })


        it('it should be displayed “A comment is required.', async () => {
            await page.title.click();
            await page.addIcon.click();
            await page.addComment.write('   ');
            await page.addComment.save();

            expect(page.addComment.isEmpty).toBeTruthy();
        });

        it('I should not able to add the comment', async () => {
            await page.title.click();
            await page.addIcon.click();
            await page.addComment.write('   ');
            await page.addComment.save();

            expect(context.port.request).toHaveBeenCalledTimes(1);
        })


    });




});


