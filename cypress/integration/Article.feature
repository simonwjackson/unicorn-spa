Feature: Article Main Page

    I want to open an article

    Background:
        Given I am logged in

    Scenario: Opening an article
        Given I open an article
        Then I see "Article" in the title
