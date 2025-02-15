require File.expand_path('../config/environment', __dir__)

require 'rspec/rails'
require 'shoulda/matchers'
require 'factory_bot'
require 'database_cleaner'
require 'rake'
require 'vcr'
require 'faker'
require 'webmock/rspec'

ActiveRecord::Migration.maintain_test_schema!

Dir[Rails.root.join('spec', 'support', '**', '*.rb')].sort.each { |f| require f }

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end

VCR.configure do |config|
  config.cassette_library_dir = 'spec/vcr'
  config.hook_into :webmock
  config.configure_rspec_metadata!
  config.default_cassette_options = {
    record: :once
  }
  config.allow_http_connections_when_no_cassette = false
  %w[
    GOOGLE_API_KEY
  ].each do |key|
    config.filter_sensitive_data('<SOMESITE_PASSWORD>') { ENV[key] }
  end
  # enable this to debug VCR
  # config.debug_logger = $stderr
end

RSpec.configure do |config| # rubocop:disable Metrics/BlockLength
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
    expectations.syntax = %i[should expect]
  end

  # rspec-mocks config goes here. You can use an alternate test double
  # library (such as bogus or mocha) by changing the `mock_with` option here.
  config.mock_with :rspec do |mocks|
    # Prevents you from mocking or stubbing a method that does not exist on
    # a real object. This is generally recommended, and will default to
    # `true` in RSpec 4.
    mocks.verify_partial_doubles = true
    mocks.syntax = %i[should expect]
  end

  # This option will default to `:apply_to_host_groups` in RSpec 4 (and will
  # have no way to turn it off -- the option exists only for backwards
  # compatibility in RSpec 3). It causes shared context metadata to be
  # inherited by the metadata hash of host groups and examples, rather than
  # triggering implicit auto-inclusion in groups with matching metadata.
  config.shared_context_metadata_behavior = :apply_to_host_groups
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!

  config.include FactoryBot::Syntax::Methods
  config.before(:suite) do
    FactoryBot.find_definitions
  end
  FactoryBot.use_parent_strategy = false # set this for implicit associations

  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end
  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end
  config.before(:each, :js => true) do
    DatabaseCleaner.strategy = :truncation
  end
  config.before(:each) do
    DatabaseCleaner.start
  end
  config.after(:each) do
    DatabaseCleaner.clean
  end
  config.before(:all) do
    DatabaseCleaner.start
  end
  config.after(:all) do
    DatabaseCleaner.clean
  end
end
